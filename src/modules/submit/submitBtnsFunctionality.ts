import { setMasterArrayToLocalStorage } from '../../main';

// types
import randomMockArrInterface from '../types/randomMockInterfaceType';

export default function submitBtnsFuntionality(
  masterArray: randomMockArrInterface[][]
) {
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
