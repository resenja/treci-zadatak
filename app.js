const client = supabase.createClient('https://qrpjxxnyavsvmdbypowt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFycGp4eG55YXZzdm1kYnlwb3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1ODY5NjAsImV4cCI6MTk4ODE2Mjk2MH0.XAG8M4YLwVpGdA5H0qLa_SgFuUNuR9rldwe94DuPf3o');
const pageNumber = 1;


let i = 0;
const messagesElement = document.querySelector('#messages');
const textareaElement = document.querySelector('#wmd-input');

function addMessageToPage(message) {
    i++;
    let text = message.content;
    text = text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
    const element = document.createElement('div');
    element.innerHTML = `
<div>
    <div class="post-layout">
        <div class="votecell post-layout--left">
            <div class="js-voting-container d-flex jc-center fd-column ai-stretch gs4 fc-black-200">
        <button class="js-vote-up-btn flex--item s-btn s-btn__unset c-pointer " data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Up vote" data-selected-classes="fc-theme-primary" data-unselected-classes="" aria-describedby="--stacks-s-tooltip-4pts3olp">
            <svg aria-hidden="true" class="svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
        </button><div id="--stacks-s-tooltip-4pts3olp" class="s-popover s-popover__tooltip" role="tooltip">This answer is useful<div class="s-popover--arrow"></div></div>
        <div class="js-vote-count flex--item d-flex fd-column ai-center fc-black-500 fs-title">
            ${i}
        </div>
        <button class="js-vote-down-btn flex--item s-btn s-btn__unset c-pointer " data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Down vote" data-selected-classes="fc-theme-primary" data-unselected-classes="" aria-describedby="--stacks-s-tooltip-8fkmzjt0">
            <svg aria-hidden="true" class="svg-icon iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
        </button><div id="--stacks-s-tooltip-8fkmzjt0" class="s-popover s-popover__tooltip" role="tooltip">This answer is not useful<div class="s-popover--arrow"></div></div>
</div>
        </div>
        
<div class="answercell post-layout--right">
    
    <div class="s-prose js-post-body" itemprop="text">
<pre class="lang-cs s-code-block"><code class="hljs language-csharp">${text}</code></pre>
    </div>
    
    
</div>
</div>
</div>
<div class="d-flex fw-wrap pb8 mb16 bb bc-black-075"></div>
</div>`;
    messagesElement.append(element);
}
async function init(){
const { data: messages, error } = await client
  .from('messages')
  .select('*')
.eq('page',pageNumber)
messages.forEach(addMessageToPage);
addNumberOfAnswers();
textareaElement.value ='';
}
function addNumberOfAnswers() {
    let s = i + " ";
    if (i != 1) s += "Answers";
    else s += "Answer";
    document.querySelector('#number-of-answers').append(s);
}
init();
document.querySelector('#post-button').onclick = async function(){
if(textareaElement.value != ''){
const { data, error } = await client
  .from('messages')
  .insert([
    { page: pageNumber, content: textareaElement.value },
  ])
location.reload();
return false;
}
}