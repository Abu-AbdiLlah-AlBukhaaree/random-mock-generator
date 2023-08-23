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
}

// ******** VARIABLES ***********
// DOM Elements
const generateNewMockBtn = document.getElementById(
  'new-mock-btn'
) as HTMLButtonElement;
const mockSection = document.getElementById('mock-section') as HTMLElement;

// Arrays
let masterArray: randomMockArrInterface[][] = [];

let singleBranchOfMasterArray: randomMockArrInterface[] = [];

const subjects: subjectsType = [
  {
    subjectID: 'BIO 001',
    examType: ['test', 'exam'],
    year: {
      test: [2013, 2014, 2015, 2016, 2017],
      exam: [2013, 2014, 2015, 2016, 2017],
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
      test: [2013, 2014, 2015, 2016, 2017],
      exam: [2013, 2014, 2015, 2016, 2017],
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
      test: [2013, 2014, 2015, 2016, 2017],
      exam: [2013, 2014, 2015, 2016, 2017],
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
      test: [2013, 2014, 2015, 2016, 2017],
      exam: [2013, 2014, 2015, 2016, 2017],
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
      test: [2013, 2014, 2015, 2016, 2017],
      exam: [2013, 2014, 2015, 2016, 2017],
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
      test: [2013, 2014, 2015, 2016, 2017],
      exam: [2013, 2014, 2015, 2016, 2017],
    },
    question: {
      test: 25,
      exam: 40,
    },
  },
];

const examTypes: ['test', 'exam'] = ['test', 'exam'];

let fullMockDOMArray: string[] = [];

let index: number;

// ******** EVENT LISTENERS ***********
generateNewMockBtn.addEventListener('click', () => {
  // Arrays Magic
  const subjectsMapped = subjects.map((subject) => {
    const { subjectID, examType, year, question } = subject;

    // if you don't understand, I'm sorry
    const newExamType = examType[getRandomNumber(examType.length)];
    const newYear = year[examTypes[getRandomNumber(examTypes.length)]];
    const singleNewYear = newYear[getRandomNumber(newYear.length)];
    const newQuestion = question[examTypes[getRandomNumber(examTypes.length)]];
    let randomQuestion = getRandomNumber(newQuestion - 5);
    if (!randomQuestion) randomQuestion = 1;

    masterArray.length === 0 ? (index = 1) : (index = masterArray.length + 1);

    return {
      index: index,
      subjectID,
      examType: newExamType,
      year: singleNewYear,
      question: randomQuestion,
    };
  });

  masterArray.push(subjectsMapped);

  const newMasterArray = masterArray.map((arr) => {
    let id: number = 0;
    let newArr = arr.map((item) => {
      const { index, subjectID, examType, year, question } = item;

      id = index;

      return singleSubject(subjectID, examType, year, question);
    });
    return fullMockDOM(id, newArr.join(''));
  });

  mockSection.innerHTML = newMasterArray.join('');
  const submitBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('#submit-btn');

  submitBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const element = e.currentTarget as HTMLButtonElement;
      element.disabled = true;
      console.log('clicked');
      console.log(element.dataset.id);

      // btn.classList.remove('bg-blue-950');
      // btn.classList.remove('text-gray-50');
      // btn.classList.add('text-blue-950');
      // btn.classList.add('text-gray-50');
    });
  });
});

// ******** LOCAL STORAGE ***********

// ******** FUNCTIONS ***********
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

function fullMockDOM(index: number, subjectsDOM: string) {
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
            value="2023-08-24"
            class="px-2 py-1 max-w-[7rem] tracking-wide bg-transparent border border-blue-950 rounded-md"
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

        <button id="submit-btn" type="submit" data-id="${index}" class="bg-blue-950 cursor-pointer text-gray-50 px-2 py-1 rounded-md tracking-widest border border-transparent transition-all duration-200 ease-linear hover:bg-transparent hover:border-blue-950 hover:text-blue-950">Submit</button>
      </form>
    </article>
  `;
}

function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}
