// Define the songs and their associated keywords
const songCategories = [
    { keywords: ['wake', 'morning', 'early'], song: 'song1.mpeg' },
    { keywords: ['bed', 'make bed'], song: 'song2.mpeg' },
    { keywords: ['brush', 'teeth', 'dental'], song: 'song3.mpeg' },
    { keywords: ['breakfast', 'food', 'eat', 'meal', 'lunch', 'dinner'], song: 'song4.mpeg' },
    { keywords: ['book', 'read', 'study'], song: 'song5.mpeg' },
    { keywords: ['walk', 'walking', 'exercise'], song: 'song6.mpeg' },
    { keywords: ['wash', 'laundry', 'clothes'], song: 'song7.mp4' },
    { keywords: ['cook', 'cooking', 'prepare food'], song: 'song8.mp4' },
    { keywords: ['clean', 'cleaning', 'organize'], song: 'song9.mpeg' },
    { keywords: ['sleep', 'night', 'bed time'], song: 'song10.mpeg' }
];

// Audio player instance
let currentAudio = null;

// Function to find the appropriate song for a task
function findSongForTask(taskText) {
    const lowercaseTask = taskText.toLowerCase();
    return songCategories.find(category => 
        category.keywords.some(keyword => lowercaseTask.includes(keyword))
    )?.song;
}

// Function to play a song
function playSong(songFile) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    currentAudio = new Audio(songFile);
    currentAudio.play();
}

// Function to add a new task
function addTask() {
    const input = document.getElementById('newTask');
    const taskText = input.value.trim();
    
    if (taskText === '') return;

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const songFile = findSongForTask(taskText);
    if (songFile) {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                playSong(songFile);
            } else if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
        });
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
        li.remove();
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
    };

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    document.getElementById('todoList').appendChild(li);
    
    input.value = '';
}
