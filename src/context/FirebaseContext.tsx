import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";

interface CounterContextType {
  data: string;
  updateDataToUser: (dataSnapshot: string) => void;
  signUpUser: (email: string, password: string) => void;
  isError: boolean;
  errorMsg: string;
  updateImg: (data: string) => void;
  myDrawingSet: (drawing: string) => void;
  galleryData: Object;
  myDrawingData: Object;
  loginUser: (email: string, password: string) => void;
}

const FirebaseContext = createContext<CounterContextType>({
  data: "",
  updateDataToUser: (dataSnapshot) => { },
  signUpUser: (email, password) => { },
  isError: false,
  errorMsg: "",
  updateImg: (data) => { },
  myDrawingSet: (drawing) => { },
  galleryData: {},
  myDrawingData: {},
  loginUser: (email, password) => { },
});

const ContextProducer = (props: any) => {

  const [galleryData, setGalleryData] = useState("")
  const [myDrawingData, setMyDrawingData] = useState("")
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState("");

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);

  function updateDataToUser(dataSnapshot: string) {
    set(ref(db, "users/"), {
      usersCanvasData: dataSnapshot,
    });
  }

  function updateImg(dataImg: string) {
    const dbRef = ref(db, "images");
    const newPostRef = push(dbRef);
    set((newPostRef), {
      usersData: dataImg
    })
  }

  function myDrawingSet(drawing: string) {
    const dbDrawingRef = ref(db, `drawings/${auth.currentUser?.uid}`);
    const newPostDrawRef = push(dbDrawingRef);
    set((newPostDrawRef), {
      usersData: drawing,
    });
  }

  useEffect(() => {
    const readMyDrawingRef = ref(db, `drawings/${auth.currentUser?.uid}`);
    onValue(readMyDrawingRef, (snapshot: any) => {
      const dataDrawing = snapshot.val();
      setMyDrawingData(dataDrawing)
    });
  }, [auth.currentUser?.uid])

  useEffect(() => {
    const readRef = ref(db, "users/");
    onValue(readRef, (snapshot: any) => {
      const data = snapshot.val();
      setData(data.usersCanvasData);
    });
  }, []);

  useEffect(() => {
    const readGalleryRef = ref(db, "images/");
    onValue(readGalleryRef, (snapshot: any) => {
      const dataGallery = snapshot.val();
      setGalleryData(dataGallery)
    });

  }, []);


  function signUpUser(email: string, password: any) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, "created successfully");
        setIsError(false)
        localStorage.setItem("isLogin", "true")
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
        setIsError(true);
      });
  }

  function loginUser(email: string, password: any) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        localStorage.setItem("isLogin", "true")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <FirebaseContext.Provider
      value={{ updateDataToUser, data, signUpUser, errorMsg, isError, updateImg, galleryData, myDrawingData, loginUser, myDrawingSet }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { ContextProducer, FirebaseContext };
