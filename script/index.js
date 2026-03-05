

const createElement = (arr)=>{
    const htmlElement = arr.map(element => `<button class="btn">${element} </button>`)
        
      return htmlElement.join(" ");
    
}

const manageSpinner = (status)=>{
    if(status===true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}

// 1.load lesson buttons from api;
const loadLessons = () =>{
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)  //  promise of response
    .then(res => res.json()) //  promise of json data
    .then(json => {
        // console.log(json.data)
        displayLessons(json.data) //array of objects;
    })
    
}

// 2.remove active buttons;
const removeActive= ()=>{
      const allLessonBtn= document.querySelectorAll('.lesson-btn')
        allLessonBtn.forEach(lessonBtn =>{
           lessonBtn.classList.remove('active')
        })
};

// 3.load all levels words from api;
const loadLevelWord =(id) =>{
    manageSpinner(true)

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(words =>{

        // remove color from all lesson btn;
       removeActive()

    // /   set active btn color;
        const lessonBtn = document.getElementById(`lesson-btn-${id}`);
        lessonBtn.classList.add('active');
        displayWords(words.data)
    })
}

//4. load word details;
 const loadWordDetail =async (id)=>{
    
    const url =`https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json()
    console.log(details.data)
    displayWordDetails(details.data)
    
 }




// 1. show all lessons buttons in display;
const displayLessons = (lessons) =>{
    // console.log(lessons)

    //1. get the container & empty;
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML="";
      

    //2. get into every lesson;
    lessons.forEach(lesson => {
        

        // 3. create HTML Element;
        const lessonCard = document.createElement('div');
     
        
        lessonCard.innerHTML=`
            <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary font-semibold">
            <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
            </button>
        `

        // 4. append lesson card in lesson container;
        lessonContainer.appendChild(lessonCard)
    })

}


// 3, show all level words in display;
const displayWords = (words)=>{
    
    // 1. get the container & empty;
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML="";

    if(words.length===0){
        wordContainer.innerHTML=`
        <div class="col-span-full text-center py-12 font-bangla space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png" alt="alert-error">
            <p class=" text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
          </div>
        `
        manageSpinner(false)
        return
    }
      
    // 2. get into every word;
    words.forEach(word => {
        
        // 3. Create HTML Element;
        const wordCard = document.createElement('div');
        wordCard.className="flex flex-col justify-end bg-base-100 px-5 md:px-7 py-10 md:py-10 rounded-lg text-center shadow-sm"
        wordCard.innerHTML=`
           <div class=" space-y-4">
            <h2 class="font-bold text-xl md:text-2xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p class="text-base md:text-xl  font-medium">meaning / pronunciation </p>
            <p class="text-[#18181B] text-xl md:text-2xl font-semibold font-bangla">"${word.meaning? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation : 'pronunciation পাওয়া যায়নি'}"</p>
              <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-primary-content hover:bg-primary hover:text-base-100">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-primary-content hover:bg-primary hover:text-base-100">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            </div>
        `

        // 4. append wordCard in wordContainer;
        wordContainer.appendChild(wordCard)
    });
    manageSpinner(false)
}


// 4. display word details;
const displayWordDetails =(detail) =>{
    
    const wordDetailsContainer = document.getElementById('word-details-container');
    wordDetailsContainer.innerHTML=`
            <div class="space-y-5 rounded-lg border-2 border-sky-100 p-5">
                <div>
                <h2 class="text-2xl font-bold">${detail.word} (<i class="fa-solid fa-microphone-lines"></i>:${detail.meaning})</h2>
              </div>

              <div>
                <h2 class="text-xl font-bold mb-2">Meaning</h2>
                <p class="font-bangla">${detail.pronunciation}</p>
              </div>

              <div>
                <h2 class="text-xl font-bold mb-2">Example</h2>
                <p>${detail.sentence}</p>
              </div>

              <div>
                <h2 class="text-xl font-bold mb-2 font-bangla">সমার্থক শব্দ গুলো</h2>
                <div class="space-x-2">${createElement(detail.synonyms)}</div>               
              </div>

            </div>
    `;
    document.getElementById("word_modal").showModal();

    
}



loadLessons()

const btnSearch= document.getElementById('btn-search');
btnSearch.addEventListener('click', ()=>{
    const inputSearch = document.getElementById('input-search');
    const inputValue = inputSearch.value.trim().toLowerCase();

    const url = "https://openapi.programming-hero.com/api/words/all";
    fetch(url)
    .then(res => res.json())
    .then(json => {
        const allWords = json.data;
        const filterWord = allWords.filter(word => word.word.toLowerCase().includes(inputValue));
       displayWords(filterWord)
    })
    
})
