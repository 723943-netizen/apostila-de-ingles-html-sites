// Aplicação principal - Gerenciamento de estado
let appState = {
  inputs: {},
  radios: {},
  reportSent: false
};

let printBackup = {
  inputs: {},
  placeholders: {},
  radios: {}
};

window.addEventListener('load', () => {
  loadMainContent();
  loadSavedState();
  updateChecklist();
  
  const formElements = document.querySelectorAll('.save-state');
  formElements.forEach(element => {
    element.addEventListener('input', () => {
      saveCurrentState();
      updateChecklist();
    });
    element.addEventListener('change', () => {
      saveCurrentState();
      updateChecklist();
    });
  });
});

function syncEmails(value) {
  const field1 = document.getElementById('student_email');
  const field2 = document.getElementById('modal_student_email');
  if (field1) field1.value = value;
  if (field2) field2.value = value;
  saveCurrentState();
}

function showNotification(message, icon = '✨') {
  const toast = document.getElementById('toast-notification');
  const text = document.getElementById('toast-message');
  const iconEl = document.getElementById('toast-icon');

  text.textContent = message;
  iconEl.textContent = icon;

  toast.classList.remove('translate-y-[-100px]', 'md:translate-x-80', 'opacity-0');
  toast.classList.add('translate-y-0', 'md:translate-x-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'md:translate-x-0');
      toast.classList.add('translate-y-[-100px]', 'md:translate-x-80');
    }, 300);
  }, 3500);
}

function saveCurrentState() {
  const elements = document.querySelectorAll('.save-state');
  elements.forEach(el => {
    if (el.type === 'radio') {
      if (el.checked) {
        appState.radios[el.name] = el.value;
      }
    } else {
      appState.inputs[el.id] = el.value;
    }
  });

  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(appState));
  
  const statusLabel = document.getElementById('save-status');
  statusLabel.textContent = 'Alterações Salvas!';
  setTimeout(() => {
    statusLabel.textContent = 'Progresso Salvo Localmente';
  }, 1500);
}

function loadSavedState() {
  const rawData = localStorage.getItem(CONFIG.STORAGE_KEY);
  if (!rawData) return;

  try {
    const saved = JSON.parse(rawData);
    appState = { ...appState, ...saved };
    
    if (appState.inputs) {
      for (const [id, value] of Object.entries(appState.inputs)) {
        const el = document.getElementById(id);
        if (el) el.value = value;
      }
    }

    if (appState.radios) {
      for (const [name, checkedValue] of Object.entries(appState.radios)) {
        const radio = document.querySelector(`input[name="${name}"][value="${checkedValue}"]`);
        if (radio) radio.checked = true;
      }
    }

    const emailVal = document.getElementById('student_email')?.value;
    const modalEmail = document.getElementById('modal_student_email');
    if (modalEmail && emailVal) modalEmail.value = emailVal;

    if (appState.reportSent) {
      unlockGabarito();
    }
  } catch (err) {
    console.error("Erro ao carregar o estado:", err);
  }
}

function areAllQuestionsAnswered() {
  const name = document.getElementById('student_name')?.value.trim();
  const group = document.getElementById('student_class')?.value.trim();
  const email = document.getElementById('student_email')?.value.trim();
  const teacher = document.getElementById('student_teacher')?.value.trim();

  if (!name || !group || !email || !teacher) return false;

  // Aqui você expandiria para validar todas as questões
  return true;
}

function updateChecklist() {
  const chkFields = document.getElementById('chk-fields');
  const chkEmail = document.getElementById('chk-email');

  const allDone = areAllQuestionsAnswered();
  if (allDone) {
    chkFields.textContent = 'Completo';
    chkFields.classList.remove('text-rose-500', 'bg-rose-500/10');
    chkFields.classList.add('text-emerald-500', 'bg-emerald-500/10');
  } else {
    chkFields.textContent = 'Incompleto';
    chkFields.classList.remove('text-emerald-500', 'bg-emerald-500/10');
    chkFields.classList.add('text-rose-500', 'bg-rose-500/10');
  }

  if (appState.reportSent) {
    chkEmail.textContent = 'Enviado';
    chkEmail.classList.remove('text-rose-500', 'bg-rose-500/10');
    chkEmail.classList.add('text-emerald-500', 'bg-emerald-500/10');
  } else {
    chkEmail.textContent = 'Pendente';
    chkEmail.classList.remove('text-emerald-500', 'bg-emerald-500/10');
    chkEmail.classList.add('text-rose-500', 'bg-rose-500/10');
  }
}

function decodeGabarito(b64) {
  try {
    return decodeURIComponent(atob(b64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    console.error("Erro ao descriptografar gabarito:", e);
    return "<p class='text-rose-500 font-bold'>Erro ao processar o gabarito. Por favor, avise o professor.</p>";
  }
}

function unlockGabarito() {
  const lockedArea = document.getElementById('gabarito-locked');
  const unlockedArea = document.getElementById('gabarito-unlocked');
  const targetArea = document.getElementById('gabarito-content-target');

  if (targetArea) {
    targetArea.innerHTML = decodeGabarito(CONFIG.ENCODED_GABARITO);
  }

  if (lockedArea) lockedArea.classList.add('hidden');
  if (unlockedArea) unlockedArea.classList.remove('hidden');
}

function showClearConfirmModal() {
  document.getElementById('clear-confirm-modal').classList.remove('hidden');
}

function closeClearConfirmModal() {
  document.getElementById('clear-confirm-modal').classList.add('hidden');
}

function executeClearProgress() {
  localStorage.removeItem(CONFIG.STORAGE_KEY);
  appState = { inputs: {}, radios: {}, reportSent: false };

  const elements = document.querySelectorAll('.save-state');
  elements.forEach(el => {
    if (el.type === 'radio') {
      el.checked = false;
    } else if (el.id !== 'delivery_date') {
      el.value = '';
    }
  });

  const modalEmail = document.getElementById('modal_student_email');
  if (modalEmail) modalEmail.value = '';

  const gabaritoLocked = document.getElementById('gabarito-locked');
  const gabaritoUnlocked = document.getElementById('gabarito-unlocked');
  if (gabaritoLocked) gabaritoLocked.classList.remove('hidden');
  if (gabaritoUnlocked) gabaritoUnlocked.classList.add('hidden');
  
  closeClearConfirmModal();
  updateChecklist();
  showNotification('Todas as respostas digitadas foram apagadas!', '🧹');
}

function calculateGrade() {
  let correct = 0;
  for (let i = 1; i <= 10; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === CONFIG.ANSWER_KEY[`q${i}`]) {
      correct++;
    }
  }
  const score = (correct * 0.5).toFixed(1);
  return { correct, score };
}

function buildReportText() {
  const name = document.getElementById('student_name')?.value || '(Não informado)';
  const group = document.getElementById('student_class')?.value || '(Não informado)';
  const studentEmail = document.getElementById('student_email')?.value || '(Não informado)';
  const teacher = document.getElementById('student_teacher')?.value || '(Não informado)';
  
  const gradeData = calculateGrade();

  let r = `==================================================\n`;
  r += `      RELATÓRIO DE RESPOSTAS - INGLÊS 1º ANO (RED)\n`;
  r += `==================================================\n\n`;
  
  r += `--------------------------------------------------\n`;
  r += `📝 NOTA DA PROVA OBJETIVA: ${gradeData.score} / 5.0 Pontos\n`;
  r += `📊 Desempenho Parcial: ${gradeData.correct} de 10 acertos (Parte I)\n`;
  r += `⚠️ PARTE DISCURSIVA (Parte II): Avaliada pelo professor (Vale 5.0 pts)\n`;
  r += `--------------------------------------------------\n\n`;

  r += `Aluno(a): ${name}\n`;
  r += `Turma: ${group}\n`;
  r += `E-mail do Aluno: ${studentEmail}\n`;
  r += `Docente: ${teacher}\n`;
  r += `Data de Entrega: ${CONFIG.DELIVERY_DATE}\n`;
  r += `Data de Envio: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}\n\n`;
  
  r += `================ FIM DO RELATÓRIO ================\n`;
  return r;
}

function generateReport() {
  const rText = buildReportText();
  const reportTextEl = document.getElementById('report-text');
  if (reportTextEl) reportTextEl.textContent = rText;
  
  const emailVal = document.getElementById('student_email')?.value;
  const modalEmail = document.getElementById('modal_student_email');
  if (modalEmail && emailVal) modalEmail.value = emailVal;

  const reportModal = document.getElementById('report-modal');
  if (reportModal) reportModal.classList.remove('hidden');
}

function closeReportModal() {
  const reportModal = document.getElementById('report-modal');
  if (reportModal) reportModal.classList.add('hidden');
}

function sendAnswersEmail() {
  const name = document.getElementById('student_name')?.value.trim();
  const group = document.getElementById('student_class')?.value.trim();
  const studentEmail = document.getElementById('student_email')?.value.trim();
  const teacher = document.getElementById('student_teacher')?.value.trim();

  if (!name || !group || !studentEmail || !teacher) {
    showNotification('Preencha a sua identificação no início da apostila!', '⚠️');
    return;
  }

  const report = buildReportText();
  const subject = `Respostas RED Inglês - Aluno(a): ${name} - Turma: ${group}`;
  const mailtoLink = `mailto:${CONFIG.DEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(report)}`;

  const sendingModal = document.getElementById('sending-modal');
  if (sendingModal) sendingModal.classList.remove('hidden');

  setTimeout(() => {
    window.location.href = mailtoLink;

    if (sendingModal) sendingModal.classList.add('hidden');
    closeReportModal();

    appState.reportSent = true;
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(appState));

    unlockGabarito();
    updateChecklist();
    
    showNotification('Respostas prontas para envio! Gabarito liberado.', '🔓');
  }, 1500);
}

function copyReportText() {
  const textRange = document.getElementById('report-text');
  const textArea = document.createElement("textarea");
  textArea.value = textRange?.textContent || '';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    showNotification('Copiado para a área de transferência!', '📋');
  } catch (err) {
    showNotification('Não foi possível copiar automaticamente.', '❌');
  }
  
  document.body.removeChild(textArea);
}

function prepareAndPrint() {
  const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
  textInputs.forEach(input => {
    if (input.id !== 'delivery_date') {
      printBackup.inputs[input.id] = input.value;
      printBackup.placeholders[input.id] = input.placeholder;
      input.value = '';
      input.placeholder = ''; 
    } else {
      input.value = CONFIG.DELIVERY_DATE;
    }
  });

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(radio => {
    if (radio.checked) {
      printBackup.radios[radio.name] = radio.value;
      radio.checked = false;
    }
  });

  setTimeout(() => {
    window.print();
    
    setTimeout(() => {
      restoreAfterPrint();
    }, 500);
  }, 100);
}

function restoreAfterPrint() {
  for (const [id, value] of Object.entries(printBackup.inputs)) {
    const input = document.getElementById(id);
    if (input) {
      input.value = value;
      input.placeholder = printBackup.placeholders[id] || '';
    }
  }

  const deliveryInput = document.getElementById('delivery_date');
  if (deliveryInput) {
    deliveryInput.value = CONFIG.DELIVERY_DATE;
  }

  for (const [name, checkedValue] of Object.entries(printBackup.radios)) {
    const radio = document.querySelector(`input[name="${name}"][value="${checkedValue}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  printBackup = { inputs: {}, placeholders: {}, radios: {} };
  showNotification('Versão digital restabelecida com o seu progresso!', '📲');
}