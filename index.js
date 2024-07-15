const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search');
const userDataContainer = document.getElementById('userData');

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    const urls = [
        `https://67lnlqkrqb.execute-api.eu-north-1.amazonaws.com/?q=${searchTerm}`,
        `https://qja5armk8k.execute-api.eu-north-1.amazonaws.com/default/awsproject?q=${searchTerm}`,
        `https://0892ngw72h.execute-api.eu-north-1.amazonaws.com/default/awsproject?q=${searchTerm}`,
        `https://5vmyarnbr5.execute-api.eu-north-1.amazonaws.com/default/api2?q=${searchTerm}`
    ];

    try {
        const response = await Promise.any(urls.map(url => fetch(url)));
        console.log('API response:', response);

        const data = await response.json();
        console.log('Parsed data:', data);

        if (Array.isArray(data.userDetails) && data.userDetails.length > 0) {
            userDataContainer.innerHTML = ''; 

            data.userDetails.forEach(studentData => {
                const student = studentData.data;
                const studentElement = document.createElement('div');
                studentElement.classList.add('flex', 'items-center', 'mb-4', 'student-entry');
                studentElement.innerHTML = `
                    <div class="flex-shrink-0 w-20 h-20">
                        <img src="${student.user_image}" alt="${student.full_name}" class="rounded-full h-20 w-20 object-cover">
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-medium text-gray-900">${student.full_name}</h3>
                        <p class="text-gray-500">${student.username}</p>
                        <p class="text-gray-500">${student.department}</p>
                    </div>
                `;
                userDataContainer.appendChild(studentElement);
            });
        } else {
            userDataContainer.innerHTML = '<p class="text-lg text-gray-900 text-center mt-4">Wait Fetch Second</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        userDataContainer.innerHTML = '<p class="text-lg text-gray-900 text-center mt-4">Error fetching data.</p>';
    }
});
