import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

// Read config
const configPath = '/Users/macintosh/Desktop/qaic-thailand/firebase-applet-config.json';
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const accounts = [
  {
    email: 'demo@qaic-thailand.com',
    password: 'demo123456',
    displayName: 'QAIC Demo Customer',
    role: 'user'
  },
  {
    email: 'auditor@qaic-thailand.com',
    password: 'auditor123456',
    displayName: 'QAIC Auditor Inspector',
    role: 'auditor'
  },
  {
    email: 'admin@qaic-thailand.com',
    password: 'adminpassword123',
    displayName: 'QAIC Administrator',
    role: 'admin'
  }
];

async function seedAccount(acc: typeof accounts[0]) {
  console.log(`Checking/Creating account: ${acc.email}...`);
  let uid = '';
  try {
    const userCred = await signInWithEmailAndPassword(auth, acc.email, acc.password);
    console.log(`Account ${acc.email} already exists.`);
    uid = userCred.user.uid;
  } catch (err: any) {
    console.log(`Account ${acc.email} does not exist or login failed. Registering...`);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, acc.email, acc.password);
      uid = userCredential.user.uid;
      await updateProfile(userCredential.user, { displayName: acc.displayName });
      console.log(`Registered ${acc.email} successfully!`);
    } catch (regErr: any) {
      console.error(`Failed to register ${acc.email}:`, regErr.message);
      return null;
    }
  }

  if (uid) {
    try {
      await setDoc(doc(db, 'users', uid), {
        uid: uid,
        email: acc.email,
        displayName: acc.displayName,
        role: acc.role,
        updatedAt: new Date()
      }, { merge: true });
      console.log(`Firestore profile for ${acc.email} updated with role: ${acc.role}`);
      return uid;
    } catch (dbErr: any) {
      if (dbErr.code === 'permission-denied') {
        console.error(`\n❌ [PERMISSION DENIED] Failed to update Firestore user profile for ${acc.email}.`);
        console.error(`This happens because your Firestore Security Rules on the Firebase Console have not been updated yet.`);
        console.error(`Please copy the contents of 'firestore.rules' on your machine and publish them on your Firebase Console, then run this seeder again.\n`);
      } else {
        console.error(`Failed to update Firestore for ${acc.email}:`, dbErr.message);
      }
      return null;
    }
  }
  return null;
}

async function main() {
  const uids: Record<string, string> = {};
  for (const acc of accounts) {
    const uid = await seedAccount(acc);
    if (uid) {
      uids[acc.email] = uid;
    }
  }

  const customerUid = uids['demo@qaic-thailand.com'];
  if (customerUid) {
    console.log('Seeding demo audit project for customer...');
    const auditId = 'audit-demo-45001';
    try {
      await setDoc(doc(db, 'audits', auditId), {
        id: auditId,
        userId: customerUid,
        standardId: 'iso-45001',
        code: 'ISO 45001:2018',
        status: 'document_review',
        currentStep: 1,
        totalSteps: 4,
        scheduledDate: '2024-03-24',
        outstandingBalance: 15400,
        uploadedDocs: {} // Start empty for testing upload
      }, { merge: true });
      console.log('Demo audit project seeded successfully!');
    } catch (auditErr: any) {
      console.error('Failed to seed demo audit project:', auditErr.message);
    }
  }
}

main().then(() => {
  console.log('Database seeding complete!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
