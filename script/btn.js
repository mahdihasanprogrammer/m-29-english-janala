
const faqBtns = document.querySelectorAll('.faq-btn');

faqBtns.forEach(faqBtn => {
    faqBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const faqSection = document.getElementById('search-faq');
    faqSection.scrollIntoView({behavior:"smooth"})
})

});


const learnBtns = document.querySelectorAll('.learn-btn');
learnBtns.forEach(learnBtn =>{

    learnBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const lessonSection = document.getElementById('lesson-section');
    lessonSection.scrollIntoView({behavior:"smooth"})
})

})

