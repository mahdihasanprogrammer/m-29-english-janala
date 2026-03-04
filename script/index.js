
const loadLessons = () =>{
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)  //  promise of response
    .then(res => res.json()) //  promise of json data
    .then(json => {
        // console.log(json.data)
        displayLessons(json.data) //array of objects;
    })
    
}


const loadLevelWord =(id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(words =>{
        displayWords(words.data)
    })
}



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
            <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary font-semibold">
            <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
            </button>
        `

        // 4. append lesson card in lesson container;
        lessonContainer.appendChild(lessonCard)
    })

}



const displayWords = (words)=>{
    
    // 1. get the container & empty;
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML="";

    // 2. get into every word;
    words.forEach(word => {
        
        // 3. Create HTML Element;
        const wordCard = document.createElement('div');
        wordCard.className="bg-base-100 p-5 rounded-lg text-center"
        wordCard.innerHTML=`
            <h2 class="font-bold text-3xl">${word.word}</h2>
            <p class="text-xl my-6">meaning/pronunciation </p>
            <p class="text-3xl font-medium font-bangla">${word.meaning} </p>
        `

        // 4. append wordCard in wordContainer;
        wordContainer.appendChild(wordCard)
    })
}

loadLessons()