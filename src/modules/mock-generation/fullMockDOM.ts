// This function generates returns an article whose content has been dynamically filled from by an array of objects
// The array of objects is a randomly generated mock

export default function fullMockDOM(
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
