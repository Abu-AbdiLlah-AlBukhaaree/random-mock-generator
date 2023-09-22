import singleSubjectDOM from './singleSubjectDOM';
import fullMockDOM from './fullMockDOM';

// types
import randomMockArrInterface from '../types/randomMockInterfaceType';

export default function convertMasterArrayToDOMContent(
  array: randomMockArrInterface[][]
) {
  const masterArrayDOM = array.map((arr) => {
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

      return singleSubjectDOM(subjectID, examType, year, question);
    });

    return fullMockDOM(id, newArr.join(''), disabilityStatus, date);
  });
  return masterArrayDOM;
}
