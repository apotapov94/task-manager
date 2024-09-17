import { getAuth } from 'firebase/auth';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDoc, getDocs, orderBy, limit, deleteDoc, doc, setDoc, startAfter } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { getDatabase, ref, set } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPcC4o3vx-cBKggrKwvatolP-_3elPL3g",
  authDomain: "task-manager-d1d30.firebaseapp.com",
  projectId: "task-manager-d1d30",
  storageBucket: "task-manager-d1d30.appspot.com",
  messagingSenderId: "419358787591",
  appId: "1:419358787591:web:32d3de6590e014096482a2"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

function translit(word){
	var converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya'
	};
 
	word = word.toLowerCase();
  
	var answer = '';
	for (var i = 0; i < word.length; ++i ) {
		if (converter[word[i]] == undefined){
			answer += word[i];
		} else {
			answer += converter[word[i]];
		}
	}
 
	answer = answer.replace(/[^-0-9a-z]/g, '-');
	answer = answer.replace(/[-]+/g, '-');
	answer = answer.replace(/^\-|-$/g, ''); 
	return answer;
}

const auth = getAuth();

export { 
	auth, 
	db, 
	collection, 
	addDoc, 
	query, 
	where, 
	getDocs, 
	orderBy, 
	limit, 
	deleteDoc, 
	doc, 
	setDoc, 
	translit, 
	uploadBytes, 
	storage, 
	ref,
	getDownloadURL,
	startAfter,
	getDoc
};