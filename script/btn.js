
document.getElementById('faq-btn').addEventListener('click', (e)=>{
    e.preventDefault()
    const faqSection = document.getElementById('search-faq');
    faqSection.scrollIntoView({behavior:"smooth"})
})
document.getElementById('learn-btn').addEventListener('click', (e)=>{
    e.preventDefault()
    const lessonSection = document.getElementById('lesson-section');
    lessonSection.scrollIntoView({behavior:"smooth"})
})