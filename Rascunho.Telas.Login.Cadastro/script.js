/**
 * SOLIDARIZE-SE — script.js
 * Navegação entre telas, troca de abas, dropdown, toast
 */
 
// ─── NAVEGAÇÃO ENTRE TELAS ────────────────────────────────────────────────────
 
/**
 * Exibe a tela especificada e esconde as demais.
 * @param {string} screenId - ID da div.screen a mostrar
 */
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
 
/** Alias para o botão "Voltar ao Início" — vai para login */
function goHome() {
  showScreen('screen-login');
}
 
 
// ─── ABAS DO FORMULÁRIO DE DOAÇÃO ────────────────────────────────────────────
 
/**
 * Alterna entre os tipos de doação: dinheiro | alimentos | roupas
 * @param {string} tipo
 */
function switchTab(tipo) {
  // Remove classe active de todas as tabs e formulários
  document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.donation-form').forEach(f => f.classList.remove('active-form'));
 
  // Ativa a tab e formulário corretos
  const tab = document.getElementById('tab-' + tipo);
  const form = document.getElementById('form-' + tipo);
 
  if (tab)  tab.classList.add('active');
  if (form) form.classList.add('active-form');
 
  // Fecha dropdown se estiver aberto
  closeDropdown();
}
 
 
// ─── DROPDOWN DE VALOR ────────────────────────────────────────────────────────
 
/** Abre/fecha o dropdown de seleção de valor */
function toggleDropdown() {
  const select = document.getElementById('custom-select');
  const list   = document.getElementById('dropdown-list');
 
  const isOpen = list.classList.contains('open');
 
  if (isOpen) {
    closeDropdown();
  } else {
    select.classList.add('open');
    list.classList.add('open');
  }
}
 
/** Fecha o dropdown */
function closeDropdown() {
  const select = document.getElementById('custom-select');
  const list   = document.getElementById('dropdown-list');
  if (select) select.classList.remove('open');
  if (list)   list.classList.remove('open');
}
 
/**
 * Seleciona um valor no dropdown
 * @param {string} valor - ex: "R$50" ou "Outro Valor"
 */
function selectValor(valor) {
  const label = document.getElementById('select-label');
  const outroWrap = document.getElementById('outro-valor-wrap');
 
  if (label) {
    label.textContent = valor;
    label.style.color = '#333'; // escurece quando selecionado
  }
 
  // Mostra campo de texto livre se "Outro Valor"
  if (outroWrap) {
    outroWrap.style.display = (valor === 'Outro Valor') ? 'block' : 'none';
  }
 
  closeDropdown();
}
 
// Fecha dropdown ao clicar fora
document.addEventListener('click', function (e) {
  const wrap = document.getElementById('valor-select-wrap');
  if (wrap && !wrap.contains(e.target)) {
    closeDropdown();
  }
});
 
 
// ─── CONFIRMAR DOAÇÃO ─────────────────────────────────────────────────────────
 
/** Exibe toast de confirmação de doação */
function confirmarDoacao() {
  showToast('✅ Doação confirmada! Obrigado pela solidariedade.');
}
 
 
// ─── TOAST ────────────────────────────────────────────────────────────────────
 
/**
 * Exibe uma mensagem temporária na base da tela
 * @param {string} msg
 * @param {number} duracao - ms antes de sumir (padrão 3200)
 */
function showToast(msg, duracao = 3200) {
  const toast = document.getElementById('toast');
  if (!toast) return;
 
  toast.textContent = msg;
  toast.classList.add('show');
 
  setTimeout(() => {
    toast.classList.remove('show');
  }, duracao);
}
 
 
// ─── HOVER RIPPLE NOS BOTÕES ─────────────────────────────────────────────────
 
/** Efeito ripple suave nos botões laranja ao clicar */
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-orange');
  if (!btn) return;
 
  const ripple = document.createElement('span');
  const rect   = btn.getBoundingClientRect();
 
  const size = Math.max(rect.width, rect.height) * 1.8;
  const x    = e.clientX - rect.left - size / 2;
  const y    = e.clientY - rect.top  - size / 2;
 
  Object.assign(ripple.style, {
    position:   'absolute',
    width:      size + 'px',
    height:     size + 'px',
    left:       x + 'px',
    top:        y + 'px',
    background: 'rgba(255,255,255,0.25)',
    borderRadius: '50%',
    transform:  'scale(0)',
    animation:  'rippleAnim 0.55s ease-out',
    pointerEvents: 'none',
  });
 
  // Garante overflow hidden no botão
  btn.style.overflow = 'hidden';
  btn.style.position = 'relative';
 
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
 
// Injeta keyframe do ripple dinamicamente
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(styleEl);
 
 
// ─── FOCUS LABEL ANIMATION NOS INPUTS ────────────────────────────────────────
 
/** Adiciona classe "filled" quando input tem valor */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.toggle('filled', input.value.length > 0);
    });
  });
});
 