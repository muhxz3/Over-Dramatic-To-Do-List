// Define the default songs and their associated keywords
let songCategories = [
    { keywords: ['wake', 'wake up', 'morning routine', 'get up'], song: 'song1.mpeg', name: 'Wake up song' },
    { keywords: ['bed', 'make bed'], song: 'song2.mpeg', name: 'Make bed song' },
    { keywords: ['brush', 'teeth', 'dental'], song: 'song3.mpeg', name: 'Brushing song' },
    { keywords: ['breakfast', 'food', 'eat', 'meal', 'lunch', 'dinner'], song: 'song4.mpeg', name: 'Meal song' },
    { keywords: ['book', 'read', 'study'], song: 'song5.mpeg', name: 'Reading song' },
    { keywords: ['walk', 'walking', 'exercise'], song: 'song6.mpeg', name: 'Exercise song' },
    { keywords: ['wash', 'laundry', 'clothes'], song: 'song7.mp4', name: 'Laundry song' },
    { keywords: ['cook', 'cooking', 'prepare food'], song: 'song8.mp4', name: 'Cooking song' },
    { keywords: ['clean', 'cleaning', 'organize'], song: 'song9.mpeg', name: 'Cleaning song' },
    { keywords: ['sleep', 'night', 'bedtime', 'go to bed'], song: 'song10.mpeg', name: 'Sleep song' }
];

// Function to add a new song
function addNewSong() {
    const fileInput = document.getElementById('songUpload');
    const keywordsInput = document.getElementById('songKeywords');
    
    if (!fileInput.files.length) {
        alert('Please select a song file');
        return;
    }

    const file = fileInput.files[0];
    const keywords = keywordsInput.value.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    
    if (!keywords.length) {
        alert('Please enter at least one keyword');
        return;
    }

    // Create object URL for the uploaded file
    const songUrl = URL.createObjectURL(file);
    
    // Add new song to categories
    const newSong = {
        keywords: keywords,
        song: songUrl,
        name: file.name,
        isCustom: true
    };
    
    songCategories.push(newSong);
    
    // Update songs list display
    updateSongsList();
    
    // Clear inputs
    fileInput.value = '';
    keywordsInput.value = '';
    
    alert('Song added successfully! You can now use it in your tasks.');
}

// Function to update the songs list display
function updateSongsList() {
    const songsList = document.getElementById('songsList');
    songsList.innerHTML = '';
    
    songCategories.forEach((category, index) => {
        const li = document.createElement('li');
        li.className = 'song-item';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = category.name;
        
        const keywordsSpan = document.createElement('span');
        keywordsSpan.className = 'keywords';
        keywordsSpan.textContent = `Keywords: ${category.keywords.join(', ')}`;
        
        if (category.isCustom) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '🗑️';
            deleteBtn.onclick = () => {
                songCategories = songCategories.filter((_, i) => i !== index);
                updateSongsList();
            };
            li.appendChild(deleteBtn);
        }
        
        li.appendChild(nameSpan);
        li.appendChild(keywordsSpan);
        songsList.appendChild(li);
    });
}

// Audio player instance
let currentAudio = null;

// Function to find the appropriate song for a task
function findSongForTask(taskText) {
    const lowercaseTask = taskText.toLowerCase();
    return songCategories.find(category => 
        category.keywords.some(keyword => lowercaseTask.includes(keyword))
    );
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
    
    const songCategory = findSongForTask(taskText);
    if (songCategory) {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                playSong(songCategory.song);
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

// Initialize the songs list when the page loads
document.addEventListener('DOMContentLoaded', updateSongsList);
