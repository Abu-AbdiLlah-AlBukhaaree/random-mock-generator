// This function accepts some info from an object and converts its data to a table row
// It is used to convert a single 'subjectID' and its related mock info to a table row
// The generated table rows will be consumed by the fullMockDOM
export default function singleSubjectDOM(
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
