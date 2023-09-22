import { availabeSubjectID } from './availableSubjectIDType';

export default interface randomMockArrInterface {
  index: number;
  subjectID: availabeSubjectID;
  examType: 'test' | 'exam';
  year: number;
  question: number;
  disabled: boolean;
  dateCreated: string;
}
