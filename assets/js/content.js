// Conteúdo estruturado da apostila
const APOSTILA_CONTENT = {
  intro: `
    <section class="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 print-shadow-none print-bg-white">
      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
        <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      <div class="text-center sm:text-left">
        <h2 class="text-base sm:text-lg font-bold text-slate-800">✨ Guia de Estudos Pedagógicos RED</h2>
        <p class="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
          Esta apostila interativa ajuda você a manter seus estudos de Língua Inglesa em dia. Você pode responder diretamente na tela do celular e salvar seu progresso, ou imprimi-la para preencher manualmente.
        </p>
      </div>
    </section>
  `,
  
  unit1: `
    <section class="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 print-shadow-none print-bg-white">
      <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-4">
        <span class="w-8 h-8 rounded-xl bg-slate-700 text-white font-bold flex items-center justify-center text-sm shrink-0">1</span>
        <h2 class="text-base sm:text-lg font-bold text-slate-800">Pronomes Sujeito e Objeto <span class="text-slate-400 font-medium text-xs block sm:inline sm:ml-1.5">(Subject & Object Pronouns)</span></h2>
      </div>

      <p class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
        Os <strong>Subject Pronouns</strong> realizam a ação (vêm antes do verbo). Os <strong>Object Pronouns</strong> recebem a ação (vêm após verbos ou preposições).
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 print-bg-white">
          <span class="bg-slate-700 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">Antes do Verbo</span>
          <h3 class="text-xs sm:text-sm font-bold text-slate-800 mt-1">Subject Pronouns</h3>
          <ul class="mt-2 space-y-1 text-xs text-slate-700">
            <li>👉 <strong>I</strong> (Eu) | <strong>You</strong> (Você)</li>
            <li>👉 <strong>He</strong> (Ele) | <strong>She</strong> (Ela) | <strong>It</strong> (Neutro)</li>
            <li>👉 <strong>We</strong> (Nós) | <strong>They</strong> (Eles/Elas)</li>
          </ul>
        </div>

        <div class="bg-babyblue-50 p-4 rounded-xl border border-babyblue-200 print-bg-white">
          <span class="bg-babyblue-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">Depois do Verbo</span>
          <h3 class="text-xs sm:text-sm font-bold text-slate-800 mt-1">Object Pronouns</h3>
          <ul class="mt-2 space-y-1 text-xs text-slate-700">
            <li>🎯 <strong>me</strong> (mim, me) | <strong>you</strong> (você)</li>
            <li>🎯 <strong>him</strong> (ele) | <strong>her</strong> (ela) | <strong>it</strong> (neutro)</li>
            <li>🎯 <strong>us</strong> (nós) | <strong>them</strong> (eles/elas)</li>
          </ul>
        </div>
      </div>

      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 print-bg-white">
        <h4 class="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-3">📝 Atividade de Fixação — Unidade 1</h4>
        <p class="text-xs text-slate-600 mb-3">Responda as questões abaixo para testar sua compreensão.</p>
      </div>
    </section>
  `
};

// Função auxiliar para renderizar conteúdo
function loadMainContent() {
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = APOSTILA_CONTENT.intro + APOSTILA_CONTENT.unit1;
  }
  console.log('Conteúdo principal carregado!');
}