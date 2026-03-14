// Huge thanks to @pov_eleanor on ArkIDE For reminding me to fix this broken mess :3

import LazyScratchBlocks from './tw-lazy-scratch-blocks';

const CORE_METADATA = {
    motion_movesteps:         { name: 'move steps',                category: 'motion',    color: '#4C97FF' },
    motion_turnright:         { name: 'turn right degrees',        category: 'motion',    color: '#4C97FF' },
    motion_turnleft:          { name: 'turn left degrees',         category: 'motion',    color: '#4C97FF' },
    motion_goto:              { name: 'go to',                     category: 'motion',    color: '#4C97FF' },
    motion_gotoxy:            { name: 'go to x y',                 category: 'motion',    color: '#4C97FF' },
    motion_glidesecstoxy:     { name: 'glide secs to x y',         category: 'motion',    color: '#4C97FF' },
    motion_pointindirection:  { name: 'point in direction',        category: 'motion',    color: '#4C97FF' },
    motion_pointtowards:      { name: 'point towards',             category: 'motion',    color: '#4C97FF' },
    motion_changexby:         { name: 'change x by',               category: 'motion',    color: '#4C97FF' },
    motion_setx:              { name: 'set x to',                  category: 'motion',    color: '#4C97FF' },
    motion_changeyby:         { name: 'change y by',               category: 'motion',    color: '#4C97FF' },
    motion_sety:              { name: 'set y to',                  category: 'motion',    color: '#4C97FF' },
    motion_ifonedgebounce:    { name: 'if on edge bounce',         category: 'motion',    color: '#4C97FF' },
    motion_setrotationstyle:  { name: 'set rotation style',        category: 'motion',    color: '#4C97FF' },
    motion_xposition:         { name: 'x position',                category: 'motion',    color: '#4C97FF' },
    motion_yposition:         { name: 'y position',                category: 'motion',    color: '#4C97FF' },
    motion_direction:         { name: 'direction',                 category: 'motion',    color: '#4C97FF' },
    looks_sayforsecs:         { name: 'say for seconds',           category: 'looks',     color: '#9966FF' },
    looks_say:                { name: 'say',                       category: 'looks',     color: '#9966FF' },
    looks_thinkforsecs:       { name: 'think for seconds',         category: 'looks',     color: '#9966FF' },
    looks_think:              { name: 'think',                     category: 'looks',     color: '#9966FF' },
    looks_show:               { name: 'show',                      category: 'looks',     color: '#9966FF' },
    looks_hide:               { name: 'hide',                      category: 'looks',     color: '#9966FF' },
    looks_switchcostumeto:    { name: 'switch costume to',         category: 'looks',     color: '#9966FF' },
    looks_nextcostume:        { name: 'next costume',              category: 'looks',     color: '#9966FF' },
    looks_switchbackdropto:   { name: 'switch backdrop to',        category: 'looks',     color: '#9966FF' },
    looks_nextbackdrop:       { name: 'next backdrop',             category: 'looks',     color: '#9966FF' },
    looks_changesizeby:       { name: 'change size by',            category: 'looks',     color: '#9966FF' },
    looks_setsizeto:          { name: 'set size to',               category: 'looks',     color: '#9966FF' },
    looks_changeeffectby:     { name: 'change effect by',          category: 'looks',     color: '#9966FF' },
    looks_seteffectto:        { name: 'set effect to',             category: 'looks',     color: '#9966FF' },
    looks_cleargraphiceffects:{ name: 'clear graphic effects',     category: 'looks',     color: '#9966FF' },
    looks_gotofrontback:      { name: 'go to front back layer',    category: 'looks',     color: '#9966FF' },
    looks_costumenumbername:  { name: 'costume number name',       category: 'looks',     color: '#9966FF' },
    looks_backdropnumbername: { name: 'backdrop number name',      category: 'looks',     color: '#9966FF' },
    looks_size:               { name: 'size',                      category: 'looks',     color: '#9966FF' },
    sound_playuntildone:      { name: 'play sound until done',     category: 'sound',     color: '#D65CD6' },
    sound_play:               { name: 'start sound',               category: 'sound',     color: '#D65CD6' },
    sound_stopallsounds:      { name: 'stop all sounds',           category: 'sound',     color: '#D65CD6' },
    sound_changeeffectby:     { name: 'change sound effect by',    category: 'sound',     color: '#D65CD6' },
    sound_seteffectto:        { name: 'set sound effect to',       category: 'sound',     color: '#D65CD6' },
    sound_cleareffects:       { name: 'clear sound effects',       category: 'sound',     color: '#D65CD6' },
    sound_changevolumeby:     { name: 'change volume by',          category: 'sound',     color: '#D65CD6' },
    sound_setvolumeto:        { name: 'set volume to',             category: 'sound',     color: '#D65CD6' },
    sound_volume:             { name: 'volume',                    category: 'sound',     color: '#D65CD6' },
    event_whenflagclicked:        { name: 'when green flag clicked',   category: 'events',  color: '#FFD500' },
    event_whenkeypressed:         { name: 'when key pressed',          category: 'events',  color: '#FFD500' },
    event_whenthisspriteclicked:  { name: 'when this sprite clicked',  category: 'events',  color: '#FFD500' },
    event_whenbackdropswitchesto: { name: 'when backdrop switches to', category: 'events',  color: '#FFD500' },
    event_whengreaterthan:        { name: 'when greater than',         category: 'events',  color: '#FFD500' },
    event_whenbroadcastreceived:  { name: 'when I receive',            category: 'events',  color: '#FFD500' },
    event_broadcast:              { name: 'broadcast',                 category: 'events',  color: '#FFD500' },
    event_broadcastandwait:       { name: 'broadcast and wait',        category: 'events',  color: '#FFD500' },
    control_wait:              { name: 'wait seconds',             category: 'control',   color: '#FFAB19' },
    control_repeat:            { name: 'repeat',                   category: 'control',   color: '#FFAB19' },
    control_forever:           { name: 'forever',                  category: 'control',   color: '#FFAB19' },
    control_if:                { name: 'if then',                  category: 'control',   color: '#FFAB19' },
    control_if_else:           { name: 'if then else',             category: 'control',   color: '#FFAB19' },
    control_wait_until:        { name: 'wait until',               category: 'control',   color: '#FFAB19' },
    control_repeat_until:      { name: 'repeat until',             category: 'control',   color: '#FFAB19' },
    control_while:             { name: 'while do',                 category: 'control',   color: '#FFAB19' },
    control_stop:              { name: 'stop',                     category: 'control',   color: '#FFAB19' },
    control_start_as_clone:    { name: 'when I start as a clone',  category: 'control',   color: '#FFAB19' },
    control_create_clone_of:   { name: 'create clone of',          category: 'control',   color: '#FFAB19' },
    control_delete_this_clone: { name: 'delete this clone',        category: 'control',   color: '#FFAB19' },
    sensing_touchingobject:       { name: 'touching',              category: 'sensing',   color: '#4CBFE6' },
    sensing_touchingcolor:        { name: 'touching color',        category: 'sensing',   color: '#4CBFE6' },
    sensing_coloristouchingcolor: { name: 'color touching color',  category: 'sensing',   color: '#4CBFE6' },
    sensing_distanceto:           { name: 'distance to',           category: 'sensing',   color: '#4CBFE6' },
    sensing_askandwait:           { name: 'ask and wait',          category: 'sensing',   color: '#4CBFE6' },
    sensing_answer:               { name: 'answer',                category: 'sensing',   color: '#4CBFE6' },
    sensing_keypressed:           { name: 'key pressed',           category: 'sensing',   color: '#4CBFE6' },
    sensing_mousedown:            { name: 'mouse down',            category: 'sensing',   color: '#4CBFE6' },
    sensing_mousex:               { name: 'mouse x',               category: 'sensing',   color: '#4CBFE6' },
    sensing_mousey:               { name: 'mouse y',               category: 'sensing',   color: '#4CBFE6' },
    sensing_loudness:             { name: 'loudness',              category: 'sensing',   color: '#4CBFE6' },
    sensing_timer:                { name: 'timer',                 category: 'sensing',   color: '#4CBFE6' },
    sensing_resettimer:           { name: 'reset timer',           category: 'sensing',   color: '#4CBFE6' },
    sensing_of:                   { name: 'of',                    category: 'sensing',   color: '#4CBFE6' },
    sensing_current:              { name: 'current',               category: 'sensing',   color: '#4CBFE6' },
    sensing_dayssince2000:        { name: 'days since 2000',       category: 'sensing',   color: '#4CBFE6' },
    sensing_username:             { name: 'username',              category: 'sensing',   color: '#4CBFE6' },
    operator_add:       { name: 'add',            category: 'operators', color: '#40BF4A' },
    operator_subtract:  { name: 'subtract',       category: 'operators', color: '#40BF4A' },
    operator_multiply:  { name: 'multiply',       category: 'operators', color: '#40BF4A' },
    operator_divide:    { name: 'divide',         category: 'operators', color: '#40BF4A' },
    operator_random:    { name: 'pick random',    category: 'operators', color: '#40BF4A' },
    operator_gt:        { name: 'greater than',   category: 'operators', color: '#40BF4A' },
    operator_lt:        { name: 'less than',      category: 'operators', color: '#40BF4A' },
    operator_equals:    { name: 'equals',         category: 'operators', color: '#40BF4A' },
    operator_and:       { name: 'and',            category: 'operators', color: '#40BF4A' },
    operator_or:        { name: 'or',             category: 'operators', color: '#40BF4A' },
    operator_not:       { name: 'not',            category: 'operators', color: '#40BF4A' },
    operator_join:      { name: 'join',           category: 'operators', color: '#40BF4A' },
    operator_letter_of: { name: 'letter of',      category: 'operators', color: '#40BF4A' },
    operator_length:    { name: 'length of',      category: 'operators', color: '#40BF4A' },
    operator_contains:  { name: 'contains',       category: 'operators', color: '#40BF4A' },
    operator_mod:       { name: 'mod',            category: 'operators', color: '#40BF4A' },
    operator_round:     { name: 'round',          category: 'operators', color: '#40BF4A' },
    operator_mathop:    { name: 'math operation', category: 'operators', color: '#40BF4A' },
};

const CAT_LABELS = {
    motion: 'Motion', looks: 'Looks', sound: 'Sound', events: 'Events',
    event: 'Events', control: 'Control', sensing: 'Sensing',
    operators: 'Operators', operator: 'Operators', variables: 'Variables',
    data: 'Variables', lists: 'Lists', myBlocks: 'My Blocks', procedures: 'My Blocks',
};

const SKIP_TYPES = new Set([
    'procedures_prototype','text','math_number','math_positive_number',
    'math_whole_number','math_integer','math_angle','colour_picker','checkbox','matrix','note',
]);

const PREFIX_MAP = {
    'motion_':     { category: 'motion',     color: '#4C97FF' },
    'looks_':      { category: 'looks',      color: '#9966FF' },
    'sound_':      { category: 'sound',      color: '#D65CD6' },
    'event_':      { category: 'events',     color: '#FFD500' },
    'control_':    { category: 'control',    color: '#FFAB19' },
    'sensing_':    { category: 'sensing',    color: '#4CBFE6' },
    'operator_':   { category: 'operators',  color: '#40BF4A' },
    'data_':       { category: 'variables',  color: '#FF8C1A' },
    'procedures_': { category: 'myBlocks',   color: '#FF6680' },
    'argument_':   { category: 'myBlocks',   color: '#FF6680' },
};

// Detect if dark mode by sampling the toolbox background
function getThemeColors() {
    const toolboxEl = document.querySelector('.blocklyToolboxDiv');
    const flyoutEl = document.querySelector('.blocklyFlyout, [class*="blocklyFlyout"]');
    let toolboxBg = 'rgb(17,17,17)', flyoutBg = '#1a1a1af2', textColor = '#fff';
    if (toolboxEl) {
        const bg = getComputedStyle(toolboxEl).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)') toolboxBg = bg;
    }
    if (flyoutEl) {
        const bg = getComputedStyle(flyoutEl).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)') flyoutBg = bg;
    }
    // Determine if dark by checking luminance of toolbox bg
    const m = toolboxBg.match(/\d+/g);
    if (m) {
        const [r, g, b] = m.map(Number);
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        textColor = lum < 0.5 ? '#ffffff' : '#1e1e1e';
        if (lum >= 0.5) flyoutBg = flyoutBg === '#1a1a1a' ? '#f9f9f9' : flyoutBg;
    }
    return { flyoutBg, textColor };
}

const BASE_CSS = `
... existing css ...
.scratchCategoryId-search,
.scratchCategoryId-search ~ * > .scratchCategoryId-search {
    -webkit-user-drag: none !important;
    user-drag: none !important;
}
.bs-wrap{position:fixed;z-index:99999;display:flex;flex-direction:column;padding:8px;box-sizing:border-box;font-family:sans-serif;}
.bs-row{display:flex;align-items:center;gap:6px;padding-bottom:8px;}
.bs-input-wrap{flex:1;position:relative;}
.bs-input-wrap svg{position:absolute;left:8px;top:50%;transform:translateY(-50%);pointer-events:none;opacity:0.45;}
.bs-input{width:100%;box-sizing:border-box;padding:7px 10px 7px 30px;border-radius:6px;border:1.5px solid rgba(128,128,128,0.2);font-size:13px;outline:none;transition:border-color .15s,box-shadow .15s;}
.bs-input:focus{border-color:#4C97FF;box-shadow:0 0 0 2px rgba(76,151,255,.25);}
.bs-clear{background:none;border:none;padding:4px 6px;border-radius:4px;cursor:pointer;opacity:.45;display:none;align-items:center;transition:opacity .1s;}
.bs-clear:hover{opacity:1;}
.bs-clear.on{display:flex;}
.bs-results{flex:1;overflow-y:auto;overflow-x:hidden;}
.bs-results::-webkit-scrollbar{width:5px;}
.bs-results::-webkit-scrollbar-thumb{background:rgba(128,128,128,.3);border-radius:3px;}
.bs-hint{padding:6px 4px 3px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;opacity:.4;user-select:none;}
.bs-item{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:6px;cursor:pointer;user-select:none;transition:background .1s;}
.bs-item:hover{background:rgba(76,151,255,.15);}
.bs-item:active{background:rgba(76,151,255,.25);}
.bs-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;box-shadow:0 1px 3px rgba(0,0,0,.3);}
.bs-name{flex:1;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.bs-badge{font-size:10px;padding:2px 6px;border-radius:10px;opacity:.85;color:#fff;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.4);flex-shrink:0;}
.bs-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:32px 16px;text-align:center;opacity:.4;font-size:13px;user-select:none;}
@keyframes bs-flash{0%,100%{opacity:1}40%,80%{opacity:.1}}
.bs-flash{animation:bs-flash .65s ease-in-out 2;}
`;

function score(query, target) {
    if (!query || !target) return 0;
    const q = query.toLowerCase(), t = target.toLowerCase();
    if (t === q) return 100;
    if (t.startsWith(q)) return 90;
    if (t.includes(q)) return 75;
    const qt = q.split(/\s+/), tt = t.split(/[\s()\[\]]+/).filter(Boolean);
    const hits = qt.filter(qw => tt.some(tw => tw.includes(qw) || qw.includes(tw))).length;
    return hits > 0 ? Math.round(40 + (hits / qt.length) * 35) : 0;
}

function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

class BlockSearch {
    constructor() {
        this.workspace = null;
        this.vm = null;
        this._meta = { ...CORE_METADATA };
        this._wrap = null;
        this._input = null;
        this._results = null;
        this._clear = null;
        this._active = false;
    }

    init(workspace, vm) {
        this.workspace = workspace;
        this.vm = vm;
        if (!document.getElementById('bs-css')) {
            const s = document.createElement('style');
            s.id = 'bs-css';
            s.textContent = BASE_CSS;
            document.head.appendChild(s);
        }
        setTimeout(() => this._patchToolbox(), 500);
        setTimeout(() => this._styleSearchCategory(), 400);

        setTimeout(() => {
            const toolbox = this.workspace && this.workspace.getToolbox();
            if (!toolbox) return;
            const proto = Object.getPrototypeOf(toolbox);
            if (proto._bsPopulatePatched) return;
            proto._bsPopulatePatched = true;
            const origPopulate = proto.populate_;
            proto.populate_ = (...args) => {
                const result = origPopulate.apply(toolbox, args);
                setTimeout(() => this.reapply(), 100);
                return result;
            };
        }, 600);

        if (vm && vm.runtime) {
            vm.runtime.on('EXTENSION_ADDED', () => setTimeout(() => { this._buildMeta(); this._patchToolbox(); }, 600));
            vm.runtime.on('BLOCKSINFO_UPDATE', () => setTimeout(() => { this._buildMeta(); this._patchToolbox(); }, 300));
        }
        setTimeout(() => this._buildMeta(), 1200);
    }


_styleSearchCategory() {
    if (!this._docListenerAttached) {
        this._docListenerAttached = true;
        document.addEventListener('mousedown', (e) => {
            if (e.target.closest('.scratchCategoryId-search')) {
                this._searchClickPending = true;
                setTimeout(() => { this._searchClickPending = false; }, 500);
                // Cancel the category drag addon's 500ms long press timer
                setTimeout(() => {
                    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                }, 0);
            }
        });
        document.addEventListener('dragstart', (e) => {
            if (e.target.closest('.scratchCategoryId-search') ||
                e.target.closest('.scratchCategoryMenuRow')?.querySelector('.scratchCategoryId-search')) {
                e.preventDefault();
            }
        }, { capture: true });
    }
    const applyStyle = () => {
        const searchItem = document.querySelector('.scratchCategoryId-search');
        if (!searchItem) return;
        const bubble = searchItem.querySelector('.scratchCategoryItemBubble');
        if (bubble && bubble.textContent !== '🔍') {
            bubble.style.cssText = 'background:none!important;border:none!important;font-size:18px;display:flex;align-items:center;justify-content:center;';
            bubble.textContent = '🔍';
        }
        const row = searchItem.closest('.scratchCategoryMenuRow') || searchItem.parentElement;
        if (row) {
            row.setAttribute('draggable', 'false');
            row.style.setProperty('-webkit-user-drag', 'none', 'important');
        }
        searchItem.setAttribute('draggable', 'false');
    };

    const tryStart = () => {
        const menu = document.querySelector('.scratchCategoryMenu');
        if (!menu) return setTimeout(tryStart, 150);
        applyStyle();
        new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.classList && node.classList.contains('scratchCategoryMenuRow')) {
                        applyStyle();
                        this._patchToolbox();
                        return;
                    }
                }
            }
        }).observe(menu, { childList: true });
    };
    tryStart();
}

_patchToolbox() {
    const toolbox = this.workspace && this.workspace.getToolbox();
    if (!toolbox || !toolbox.categoryMenu_) return;
    const searchCat = toolbox.categoryMenu_.categories_.find(c => c.id_ === 'search');
    if (!searchCat || searchCat._bsPatched) return;
    searchCat._bsPatched = true;
    const orig = searchCat.setSelected.bind(searchCat);
    searchCat.setSelected = (isSelected) => {
        if (isSelected && !this._navigating) {
            if (this._searchClickPending) {
                this._searchClickPending = false;
                this._toggle();
            }
            return;
        }
        return orig(isSelected);
    };
}

    _toggle() {
        this._active ? this._hide() : this._show();
    }

    _show() {
        this._active = true;
        if (this._wrap) { this._wrap.remove(); this._wrap = null; }
        this._buildUI();
        this._buildMeta();
        setTimeout(() => this._input && this._input.focus(), 80);
    }

    _hide() {
        this._active = false;
        if (this._wrap) { this._wrap.remove(); this._wrap = null; }
    }

    _buildUI() {
        const { flyoutBg, textColor } = getThemeColors();

        // Position to match the flyout exactly
        const flyoutEl = document.querySelector('.blocklyFlyout') ||
                         document.querySelector('[class*="blocklyFlyout"]');
        let left = '60px', top = '56px', width = '250px', height = 'calc(100vh - 56px)';
        if (flyoutEl) {
            const rect = flyoutEl.getBoundingClientRect();
            left = rect.left + 'px';
            top = rect.top + 'px';
            width = rect.width + 'px';
            height = rect.height + 'px';
        }

        this._wrap = document.createElement('div');
        this._wrap.className = 'bs-wrap';
        this._wrap.style.cssText = `
            position:fixed;left:${left};top:${top};width:${width};height:${height};
            z-index:99999;display:flex;flex-direction:column;padding:8px;
            box-sizing:border-box;background:${flyoutBg};color:${textColor};
        `;
        document.body.appendChild(this._wrap);

        this._wrap.innerHTML = `
            <div class="bs-row">
                <label class="bs-input-wrap">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${textColor}" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input class="bs-input" type="text" placeholder="Search blocks…" autocomplete="off" spellcheck="false" style="background:${flyoutBg === '#f9f9f9' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'};color:${textColor};"/>
                </label>
                <button class="bs-clear" aria-label="Clear" style="color:${textColor}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${textColor}" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
            <div class="bs-results" style="color:${textColor}"></div>`;

        this._input = this._wrap.querySelector('.bs-input');
        this._results = this._wrap.querySelector('.bs-results');
        this._clear = this._wrap.querySelector('.bs-clear');

        this._input.addEventListener('input', () => {
            const q = this._input.value;
            this._clear.classList.toggle('on', q.length > 0);
            q.trim() ? this._search(q.trim()) : this._showEmpty();
        });
        this._clear.addEventListener('click', () => {
            this._input.value = '';
            this._clear.classList.remove('on');
            this._showEmpty();
            this._input.focus();
        });
        this._showEmpty();
    }

_getAllToolboxBlockTypes() {
    const toolbox = this.workspace && this.workspace.getToolbox();
    if (!toolbox || !toolbox.categoryMenu_) return new Map();

    // Map of blockType -> { category, color }
    const blockMap = new Map();

    for (const cat of toolbox.categoryMenu_.categories_) {
        if (cat.id_ === 'search') continue;

        const color = cat.colour_ || '#888';
        const catId = cat.id_;

        if (cat.custom_ === 'VARIABLE' || cat.custom_ === 'LIST') {
            // Variable/List blocks are in the flyout as data_ prefix
            const flyout = toolbox.flyout_;
            if (flyout && flyout.workspace_) {
                for (const b of flyout.workspace_.getAllBlocks(false)) {
                    if (!b.type) continue;
                    const isShadow = typeof b.isShadow === 'function' ? b.isShadow() : b.isShadow;
                    if (isShadow) continue;
                    const prefix = cat.custom_ === 'VARIABLE' ? 'data_' : 'data_';
                    const listTypes = new Set(['data_addtolist','data_deleteoflist','data_deletealloflist','data_insertatlist','data_replaceitemoflist','data_itemoflist','data_itemnumoflist','data_lengthoflist','data_listcontainsitem','data_showlist','data_hidelist','data_listcontents']);
                    const varTypes = new Set(['data_variable','data_setvariableto','data_changevariableby','data_showvariable','data_hidevariable']);
                    const isVar = cat.custom_ === 'VARIABLE' && varTypes.has(b.type);
                    const isList = cat.custom_ === 'LIST' && listTypes.has(b.type);
                    if (isVar || isList) {
                        blockMap.set(b.type, { category: catId, color: b.colour_ || b.getColour?.() || color });
                    }
                }
            }
            continue;
        }

        if (cat.custom_ === 'PROCEDURE') {
            // My Blocks — procedures_call etc handled separately, skip for now
            continue;
        }

        // Normal category — read block types from contents_ DOM elements
        if (cat.contents_) {
            for (const el of cat.contents_) {
                const type = el.getAttribute && el.getAttribute('type');
                if (!type) continue;
                // Get color from the actual rendered block if possible
                const flyoutBlock = toolbox.flyout_?.workspace_?.getAllBlocks(false)
                    .find(b => b.type === type && !(typeof b.isShadow === 'function' ? b.isShadow() : b.isShadow));
                const blockColor = flyoutBlock?.colour_ || flyoutBlock?.getColour?.() || color;
                blockMap.set(type, { category: catId, color: blockColor });
            }
        }
    }

    return blockMap;
}

_search(query) {
    const blockMap = this._getAllToolboxBlockTypes();
    if (blockMap.size === 0) return;

    const results = [];
    const SB = LazyScratchBlocks.isLoaded() ? LazyScratchBlocks.get() : null;
    const toolbox = this.workspace && this.workspace.getToolbox();
    let order = 0;

    for (const [type, { category, color }] of blockMap) {
        let name = '';
        const flyoutBlock = toolbox.flyout_?.workspace_?.getAllBlocks(false)
            .find(b => b.type === type && !(typeof b.isShadow === 'function' ? b.isShadow() : b.isShadow));

        if (flyoutBlock && flyoutBlock.inputList) {
            const parts = [];
            for (const input of flyoutBlock.inputList) {
                for (const field of (input.fieldRow || [])) {
                    if (field.EDITABLE) {
                        // Dropdowns show as [], editable text/number inputs show as ()
                        if (field.constructor && field.constructor.name && field.constructor.name.includes('Dropdown')) {
                            parts.push('[]');
                        } else {
                            parts.push('()');
                        }
                    } else if (field.getText && typeof field.getText === 'function') {
                        const txt = field.getText().trim();
                        if (txt && txt !== '▼') parts.push(txt);
                    }
                }
                // Value inputs (block slots) show as ()
                if (input.type === 1) parts.push('()');
                // Statement inputs (C-blocks) show as {}
                if (input.type === 3) parts.push('{}');
            }
            name = parts.join(' ').toLowerCase().trim();
        }

        if (!name && SB && SB.Blocks[type] && SB.Blocks[type].json?.message0) {
            let msg = SB.Blocks[type].json.message0;
            (SB.Blocks[type].json.args0 || []).forEach((arg, i) => {
                msg = msg.replace(`%${i + 1}`, '');
            });
            name = msg.replace(/\s+/g, ' ').trim().toLowerCase();
        }

        if (!name) name = type.replace(/^[a-z]+_/, '').replace(/_/g, ' ').toLowerCase();

        const s = Math.max(
            score(query, name),
            score(query, type.replace(/^[a-z]+_/, '').replace(/_/g, ' ')) * 0.8,
            score(query, category) * 0.5,
            score(query, (CAT_LABELS[category] || category)) * 0.5
        );
        if (s >= 20) results.push({ type, name, color, category, score: s, order: order++ });
    }

    results.sort((a, b) => {
        const diff = b.score - a.score;
        if (Math.abs(diff) > 5) return diff;
        return a.order - b.order;
    });
    this._renderResults(results.slice(0, 15), query);
}

    _renderResults(results, query) {
        this._results.innerHTML = '';
        if (!results.length) {
            this._results.innerHTML = `<div class="bs-empty"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><div>No results for <strong>"${esc(query)}"</strong></div></div>`;
            return;
        }
        const primary = results.filter(r => r.score >= 60);
        const similar = results.filter(r => r.score < 60);
        if (primary.length) {
            this._results.appendChild(this._hint('Best matches'));
            primary.forEach(r => this._results.appendChild(this._item(r)));
        }
        if (similar.length) {
            this._results.appendChild(this._hint('Similar blocks'));
            similar.forEach(r => this._results.appendChild(this._item(r)));
        }
    }

    _hint(text) {
        const d = document.createElement('div');
        d.className = 'bs-hint';
        d.textContent = text;
        return d;
    }

    _item(result) {
        const d = document.createElement('div');
        d.className = 'bs-item';
        d.setAttribute('role', 'button');
        d.setAttribute('tabindex', '0');
        const label = CAT_LABELS[result.category] || result.category;
        d.innerHTML = `<div class="bs-dot" style="background:${result.color}"></div><span class="bs-name">${esc(result.name)}</span><span class="bs-badge" style="background:${result.color}">${esc(label)}</span>`;
        const go = () => this._navigate(result.type, result.category);
        d.addEventListener('click', go);
        d.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && go());
        return d;
    }

    _showEmpty() {
        if (!this._results) return;
        this._results.innerHTML = `<div class="bs-empty"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><div>Search for any block</div><div>This is NOT meant to find things like Specific Variables and Lists</div></div>`;
    }


_navigate(blockType, category) {
    const toolbox = this.workspace && this.workspace.getToolbox();
    if (!toolbox) return;
    this._hide();
    this._switchCategory(category);
    this._waitForBlockAndFlash(blockType);
}

_switchCategory(catId) {
    const toolbox = this.workspace.getToolbox();
    if (!toolbox || !toolbox.categoryMenu_) return;
    const aliases = { events: 'event', event: 'events', operators: 'operator', operator: 'operators' };
    const cat = toolbox.categoryMenu_.categories_.find(c => {
        const id = (c.id_ || '').toLowerCase();
        return id === catId.toLowerCase() || id === (aliases[catId] || '').toLowerCase();
    });
    if (!cat) return;
    this._navigating = true;
    toolbox.setSelectedItem(cat);
    this._navigating = false;
}


_waitForBlockAndFlash(blockType, attempts = 0) {
    if (attempts > 20) return;
    const toolbox = this.workspace && this.workspace.getToolbox();
    if (!toolbox || !toolbox.flyout_ || !toolbox.flyout_.workspace_) return;

    const allBlocks = toolbox.flyout_.workspace_.getAllBlocks(false).filter(b => {
        if (b.type !== blockType) return false;
        return !(typeof b.isShadow === 'function' ? b.isShadow() : b.isShadow);
    });

    const block = allBlocks[allBlocks.length - 1];

    if (!block || !block.svgGroup_) {
        return setTimeout(() => this._waitForBlockAndFlash(blockType, attempts + 1), 50);
    }

    try {
        const xy = block.getRelativeToSurfaceXY();
        if (toolbox.flyout_.workspace_.scrollbar) {
            toolbox.flyout_.workspace_.scrollbar.set(Math.max(0, xy.y - 80));
        }
    } catch (_) {}

    const svg = block.svgGroup_;
    let flashInterval = setInterval(() => {
        svg.classList.add('bs-flash');
        setTimeout(() => svg.classList.remove('bs-flash'), 650);
    }, 1400);

    const stopFlash = () => {
        clearInterval(flashInterval);
        svg.classList.remove('bs-flash');
        svg.removeEventListener('mouseenter', stopFlash);
    };

    svg.addEventListener('mouseenter', stopFlash);

    setTimeout(() => {
        clearInterval(flashInterval);
        svg.classList.remove('bs-flash');
        svg.removeEventListener('mouseenter', stopFlash);
    }, 30000);
}

    _resolveCatId(blockType, category) {
        if (this.vm && this.vm.runtime && this.vm.runtime._blockInfo) {
            const extId = blockType.split('_')[0];
            const cores = new Set(['motion','looks','sound','event','control','sensing','operator','data','procedures','argument']);
            if (!cores.has(extId)) {
                const info = this.vm.runtime._blockInfo.find(i => i.id === extId);
                if (info) return info.id;
            }
        }
        return category;
    }

    _flash(blockType) {
        const toolbox = this.workspace && this.workspace.getToolbox();
        if (!toolbox || !toolbox.flyout_ || !toolbox.flyout_.workspace_) return;
        const block = toolbox.flyout_.workspace_.getAllBlocks(false).find(b => {
            if (b.type !== blockType) return false;
            return !(typeof b.isShadow === 'function' ? b.isShadow() : b.isShadow);
        });
        if (!block || !block.svgGroup_) return;
        try {
            const xy = block.getRelativeToSurfaceXY();
            if (toolbox.flyout_.workspace_.scrollbar) {
                toolbox.flyout_.workspace_.scrollbar.set(Math.max(0, xy.y - 80));
            }
        } catch (_) {}
        block.svgGroup_.classList.add('bs-flash');
        setTimeout(() => block.svgGroup_.classList.remove('bs-flash'), 1400);
    }

    _buildMeta() {
        if (!LazyScratchBlocks.isLoaded()) return;
        const SB = LazyScratchBlocks.get();
        for (const type of Object.keys(SB.Blocks || {})) {
            if (SKIP_TYPES.has(type) || this._meta[type] || type.startsWith('extension_')) continue;
            const def = SB.Blocks[type];
            if (!def) continue;
            let category = 'extension', color = '#0FBD8C';
            for (const [prefix, info] of Object.entries(PREFIX_MAP)) {
                if (type.startsWith(prefix)) { category = info.category; color = info.color; break; }
            }
            if (category === 'extension' && this.vm && this.vm.runtime._blockInfo) {
                const extId = type.split('_')[0];
                const ext = this.vm.runtime._blockInfo.find(i => i.id === extId);
                if (ext) { category = ext.id; color = ext.color1 || ext.colour || color; }
            }
            let name = '';
            if (def.json && def.json.message0) {
                let msg = def.json.message0;
                (def.json.args0 || []).forEach((arg, i) => {
                    msg = msg.replace(`%${i + 1}`, arg.type === 'input_value' ? '()' : arg.type === 'input_statement' ? '{}' : arg.type.startsWith('field_') ? '[]' : '');
                });
                name = msg.replace(/\s+/g, ' ').trim().toLowerCase();
            }
            if (!name) name = type.replace(/^[a-z]+_/, '').replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toLowerCase().trim();
            this._meta[type] = { name, category, color };
        }
    }
reapply() {
    this._patchToolbox();
    const searchItem = document.querySelector('.scratchCategoryId-search');
    if (!searchItem) return;
    const bubble = searchItem.querySelector('.scratchCategoryItemBubble');
    if (bubble && bubble.textContent !== '🔍') {
        bubble.style.cssText = 'background:none!important;border:none!important;font-size:18px;display:flex;align-items:center;justify-content:center;';
        bubble.textContent = '🔍';
    }
}
}

export default new BlockSearch();