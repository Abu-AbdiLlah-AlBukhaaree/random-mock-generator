import './style.css';

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
interface randomMockArrInterface {
  index: number;
  subjectID: availabeSubjectID;
  examType: 'test' | 'exam';
  year: number;
  question: number;
  disabled: boolean;
  dateCreated: string;
}

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
displayMockSectionContent();
submitBtnsFuntionality();

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

  displayMockSectionContent();
  submitBtnsFuntionality();
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
// This function accepts some info from an object and converts its data to a table row
// It is used to convert a single 'subjectID' and its related mock info to a table row
// The generated table rows will be consumed by the fullMockDOM
function singleSubject(
  subjectID: string,
  examType: 'test' | 'exam',
  year: number,
  question: number
): string {
  return `
    <tr class="border-t">
      <td class="p-2 text-center">${subjectID}</td>
      <td class="p-2 text-center">${examType.toUpperCase()}</td>
      <td class="p-2 text-center">${year}</td>
      <td class="p-2 text-center">${question}</td>
    </tr>
  `;
}

// This function generates returns an article whose content has been dynamically filled from by an array of objects
// The array of objects is a randomly generated mock
function fullMockDOM(
  index: number,
  subjectsDOM: string,
  disability: boolean,
  date: string
) {
  // The functionality below is to update the status of the submit button is it has been clicked
  // For now the submit button is disabled
  // The toggling functionality of the submit button will be activated once I start working on collecting form data for mock exam results
  let status = '';
  if (disability) status = 'disabled';

  return `
    <article class="border-t border-gray-500 py-10">
      <h2 class="mb-2 font-bold uppercase">Mock ${index}</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-blue-950 text-gray-50">
              <th class="p-2">ID</th>
              <th class="p-2">Type</th>
              <th class="p-2">Year</th>
              <th class="p-2">No.</th>
            </tr>
          </thead>

          <tbody>${subjectsDOM}</tbody>
        </table>
      </div>

      <hr class="w-1/2 block border-2 mx-auto my-4 " />

      <form class="mt-4 flex gap-3 flex-wrap">
        <div>
          <label for="date">Date:</label>
          <input
            id="date"
            type="text"
            placeholder="Date"
            value="${date}"
            class="px-2 py-1 max-w-[10rem] tracking-wide bg-transparent border border-blue-950 rounded-md"
            disabled
          />
        </div>

        <div>
          <label for="apt">APT:</label>
          <input
            id="apt"
            type="number"
            required
            max="10"
            class="px-2 py-1 max-w-[4rem] tracking-wide bg-transparent border border-blue-950 transition-all duration-200 ease-linear hover:bg-white focus:bg-white rounded-md"
          />
        </div>

        <div>
          <label for="bio">BIO:</label>
          <input
            id="bio"
            type="number"
            required
            max="10"
            class="px-2 py-1 max-w-[4rem] tracking-wide bg-transparent border border-blue-950 transition-all duration-200 ease-linear hover:bg-white focus:bg-white rounded-md"
          />
        </div>

        <div>
          <label for="chm">CHM:</label>
          <input
            id="chm"
            type="number"
            required
            max="10"
            class="px-2 py-1 max-w-[4rem] tracking-wide bg-transparent border border-blue-950 transition-all duration-200 ease-linear hover:bg-white focus:bg-white rounded-md"
          />
        </div>

        <div>
          <label for="phy">PHY:</label>
          <input
            id="phy"
            type="number"
            required
            max="10"
            class="px-2 py-1 max-w-[4rem] tracking-wide bg-transparent border border-blue-950 transition-all duration-200 ease-linear hover:bg-white focus:bg-white rounded-md"
          />
        </div>

        <button id="submit-btn" ${status} type="submit" data-id="${index}" class="bg-blue-950 cursor-pointer text-gray-50 px-2 py-1 rounded-md tracking-widest border border-transparent transition-all duration-200 ease-linear hover:bg-transparent hover:border-blue-950 hover:text-blue-950">Submit</button>
      </form>
    </article>
  `;
}

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

function convertMasterArrayToDOMContent() {
  const masterArrayDOM = masterArray.map((arr) => {
    // The master array is an array of arrays
    // The inner array contains data for a single, full randomly-generated mock
    // The inner array is an array of objects. Each object cotains data for each 'subjectID' and its generated mock

    // The inner map method on 'arr' is used to generate each 'subjectID' and its mock data as a table row
    // newArr converts each object in 'arr' to table row and stores the stringed table row as an item in the array
    // The returned fullmockDOM returns a full table based on the content of each array in the 'masterArray'

    // Because I need same data in each 'arr' to be displayed outsided the table row (i.e to be displayed in fullMockDOM), I neeeded to declare the following let variables so as to collect the data from the objects in the array of objects and display them in fullMockDOM
    // I collected the needed data from the first item in the array of objects since each object in an array contains the same value for the data collected
    let id: number = arr[0].index;
    let disabilityStatus: boolean = arr[0].disabled;
    let date: string = arr[0].dateCreated;

    let newArr = arr.map((item) => {
      const { subjectID, examType, year, question } = item;

      return singleSubject(subjectID, examType, year, question);
    });

    return fullMockDOM(id, newArr.join(''), disabilityStatus, date);
  });
  return masterArrayDOM;
}

function setMasterArrayToLocalStorage() {
  localStorage.setItem('subjects', JSON.stringify(masterArray));
}

function submitBtnsFuntionality() {
  const submitBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('#submit-btn');

  submitBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const element = e.currentTarget as HTMLButtonElement;
      // element.disabled = true; // Uncomment this once you start working on collect mock result data form
      const dataId = element.dataset.id;
      console.log(`Submit button of mock ${dataId} was clicked`);

      let i = 0;
      while (i < masterArray.length) {
        const btnParent = masterArray[i];

        if (btnParent[0].index === parseInt(dataId!)) {
          btnParent.forEach((item) => (item.disabled = true));
        }

        i++;
        setMasterArrayToLocalStorage();
      }
    });
  });
}

// converts 'convertMasterArrayToDOMContent()' array to the content of the 'mockSection'
function displayMockSectionContent() {
  mockSection.innerHTML = convertMasterArrayToDOMContent().join('');
}
