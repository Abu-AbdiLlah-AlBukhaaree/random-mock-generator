import './style.css';
import convertMasterArrayToDOMContent from './modules/mock-generation/masterArrayDOM';
import submitBtnsFuntionality from './modules/submit/submitBtnsFunctionality';

// types
import randomMockArrInterface from './modules/types/randomMockInterfaceType';

// ******** TYPES ***********
type availabeSubjectID =
  | 'BIO 001'
  | 'BIO 002'
  | 'CHM 001'
  | 'CHM 002'
  | 'PHY 001'
  | 'PHY 002';
interface subjectInterface {
  subjectID: availabeSubjectID;
  examType: ['test', 'exam'];
  year: {
    test: number[];
    exam: number[];
  };
  question: {
    test: number;
    exam: number;
  };
}
type subjectsType = subjectInterface[];

// ******** VARIABLES ***********
// !!! DOM Elements
const generateNewMockBtn = document.getElementById(
  'new-mock-btn'
) as HTMLButtonElement;
const mockSection = document.getElementById('mock-section') as HTMLElement;
const clearBtn = document.getElementById('clear') as HTMLButtonElement;

// !!! Arrays

// This is the array that a random mock exam will be generated with respect to.
// It contains data for all availble subjects, years, and questions available for each exam type (test/exam)
const subjects: subjectsType = [
  {
    subjectID: 'BIO 001',
    examType: ['test', 'exam'],
    year: {
      test: [2019, 2018, 2014, 2012, 2011, 2010, 2008, 2007, 2005, 2004],
      exam: [2017, 2016, 2015, 2014, 2013, 2012, 2010, 2009, 2007, 2005, 2004],
    },
    question: {
      test: 40,
      exam: 60,
    },
  },
  {
    subjectID: 'BIO 002',
    examType: ['test', 'exam'],
    year: {
      test: [2019, 2013, 2011, 2006, 2005],
      exam: [2017, 2015, 2014, 2013, 2010, 2009, 2007, 2006, 2005],
    },
    question: {
      test: 40,
      exam: 60,
    },
  },
  {
    subjectID: 'CHM 001',
    examType: ['test', 'exam'],
    year: {
      test: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2010],
      exam: [2021, 2017, 2016, 2015, 2014, 2013, 2012, 2010],
    },
    question: {
      test: 25,
      exam: 40,
    },
  },
  {
    subjectID: 'CHM 002',
    examType: ['test', 'exam'],
    year: {
      test: [
        2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
        2009, 2008,
      ],
      exam: [2021, 2017, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008],
    },
    question: {
      test: 25,
      exam: 40,
    },
  },
  {
    subjectID: 'PHY 001',
    examType: ['test', 'exam'],
    year: {
      test: [
        2021, 2020, 2019, 2018, 2017, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
      ],
      exam: [
        2021, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,
      ],
    },
    question: {
      test: 25,
      exam: 40,
    },
  },
  {
    subjectID: 'PHY 002',
    examType: ['test', 'exam'],
    year: {
      test: [
        2021, 2020, 2019, 2018, 2017, 2015, 2013, 2012, 2011, 2010, 2009, 2008,
        2007, 2005,
      ],
      exam: [
        2021, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,
        2006,
      ],
    },
    question: {
      test: 25,
      exam: 40,
    },
  },
];

// This group is to display the already generated array (if available) stored in the Local Storage
let masterArray: randomMockArrInterface[][] = [];
const getMasterArray = localStorage.getItem('subjects');
if (getMasterArray) {
  masterArray = JSON.parse(getMasterArray);
}
displayMockSectionContent(masterArray);
submitBtnsFuntionality(masterArray);

// ******** EVENT LISTENERS ***********
generateNewMockBtn.addEventListener('click', () => {
  let index: number; // For generating an index for each generated mock
  masterArray.length === 0 ? (index = 1) : (index = masterArray.length + 1);

  // The 'randomMockArr' is the engine of the app
  // Remember the 'subjects' array?
  // The 'randomMockArr' maps on the 'subjects' array and generate for each 'subjectID' a random 'examType'(test/exam), year(based on 'examType' generated), and question to start from(based on 'examType' generated)
  // The inspect the 'subjects' array to better understand how this functionality array
  const randomMockArr = subjects.map((subject) => {
    const { subjectID, examType, year, question } = subject;

    const newExamType = examType[getRandomNumber(examType.length)]; // to generate 'examType' (test/exam)

    const newYear = year[newExamType]; // to get years available for generated 'examType' (returns an array)
    const singleNewYear = newYear[getRandomNumber(newYear.length)]; // get a random year from the array returned

    const newQuestion = question[newExamType]; // to get number of questions available for generated 'examType' (returns an number)
    let randomQuestion = getRandomNumber(newQuestion - 5); // to get a random number, from 0 to the number returned above
    if (!randomQuestion) randomQuestion = 1; // return '1' if the generated number is 0

    return {
      index,
      subjectID,
      examType: newExamType,
      year: singleNewYear,
      question: randomQuestion,

      // !!! TODO !!!
      // when you complete result calculation, change disabled to 'false'
      disabled: true,
      dateCreated: formatDateAndTime(new Date()),
    };
  });

  masterArray.push(randomMockArr);
  masterArray.sort(sortMasterArray); // to sort master array in descending order with respect to 'index'

  displayMockSectionContent(masterArray);
  submitBtnsFuntionality(masterArray);
  setMasterArrayToLocalStorage();
});

// clear local storage
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('subjects');
  masterArray = [];
  mockSection.innerHTML = '';
});

// ******** LOCAL STORAGE ***********

// ******** FUNCTIONS ***********

function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

// formats date and time to the format - 'dd-mm-yyyy, hh:mm'
function formatDateAndTime(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDateAndTime = `${day}-${month}-${year}, ${hours}:${minutes}`;
  return formattedDateAndTime;
}

function sortMasterArray(
  a: randomMockArrInterface[],
  b: randomMockArrInterface[]
): number {
  return b[0].index - a[0].index;
}

export function setMasterArrayToLocalStorage() {
  localStorage.setItem('subjects', JSON.stringify(masterArray));
}

// converts 'convertMasterArrayToDOMContent()' array to the content of the 'mockSection'
function displayMockSectionContent(arr: randomMockArrInterface[][]) {
  mockSection.innerHTML = convertMasterArrayToDOMContent(arr).join('');
}
