export default async function ({ addon, console, msg }) {
  const vm = addon.tab.traps.vm;
  
  await new Promise((resolve) => {
    if (vm.editingTarget) return resolve();
    vm.runtime.once("PROJECT_LOADED", resolve);
  });

  const ScratchBlocks = await addon.tab.traps.getBlockly();

    const iconReplacements = {
    "event_whenflagclicked": "flag",
    "event_whenkeypressed": "key",
    "looks_costume": "costume",
    "looks_backdrop": "backdrop",
    "sound_sounds_menu": "sound",
    "motion_pointtowards_menu": "sprite",
    "sensing_touchingobjectmenu": "sprite",
    "sensing_distancetomenu": "sprite",
    "sensing_keyoptions": "key",
    "control_stop": "stop",
    };

  // Create the button
  const viewerButtonOuter = document.createElement("div");
  viewerButtonOuter.className = "sa-js-viewer-container";
  
  const viewerButton = document.createElement("div");
  viewerButton.className = addon.tab.scratchClass("button_outlined-button", "stage-header_stage-button");
  
  const viewerButtonContent = document.createElement("div");
  viewerButtonContent.className = addon.tab.scratchClass("button_content");
  
  const viewerButtonImage = document.createElement("img");
  viewerButtonImage.className = addon.tab.scratchClass("stage-header_stage-button-icon");
  viewerButtonImage.draggable = false;
  viewerButtonImage.src = addon.self.getResource("/icons/code.svg") /* rewritten by pull.js */;
  
  viewerButtonContent.appendChild(viewerButtonImage);
  viewerButton.appendChild(viewerButtonContent);
  viewerButtonOuter.appendChild(viewerButton);

  // Create the interface
  const interfaceContainer = document.createElement("div");
  interfaceContainer.className = addon.tab.scratchClass("card_card", { others: "sa-js-viewer-interface" });
  interfaceContainer.style.display = "none";

  const interfaceHeader = document.createElement("div");
  interfaceHeader.className = addon.tab.scratchClass("card_header-buttons");

  const title = document.createElement("h1");
  title.textContent = "JavaScript Viewer (READ ONLY)";
  title.style.cssText = "padding: 10px; font-size: 20px; margin: 0; color: white; cursor: move;";

    const closeButton = document.createElement("div");
    closeButton.className = addon.tab.scratchClass("card_shrink-expand-button");
    closeButton.innerHTML = `<img src="${addon.self.getResource("/icons/close.svg") /* rewritten by pull.js */}" style="width: 20px; height: 20px;"><div style="font-size: 10px; color: white; margin-top: 2px;">Close</div>`;

    const refreshButton = document.createElement("div");
    refreshButton.className = addon.tab.scratchClass("card_shrink-expand-button");
    refreshButton.innerHTML = `<img src="${addon.self.getResource("/icons/refresh.svg") /* rewritten by pull.js */}" style="width: 20px; height: 20px;"><div style="font-size: 10px; color: white; margin-top: 2px;">Refresh</div>`;
    refreshButton.title = "Refresh code view";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = addon.tab.scratchClass("card_header-buttons-right");
  buttonContainer.appendChild(refreshButton);
  buttonContainer.appendChild(closeButton);

  interfaceHeader.appendChild(title);
  interfaceHeader.appendChild(buttonContainer);

  const codeContainer = document.createElement("div");
  codeContainer.className = "sa-js-viewer-code";
  codeContainer.style.cssText = "width: 100%; height: 100%; overflow: auto; padding: 15px; box-sizing: border-box; font-family: monospace; font-size: 13px; line-height: 1.6; white-space: pre; background: #1e1e1e; color: #d4d4d4;";

  interfaceContainer.appendChild(interfaceHeader);
  interfaceContainer.appendChild(codeContainer);
  document.body.appendChild(interfaceContainer);

  // Dragging functionality
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  title.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - interfaceContainer.offsetLeft;
    dragOffsetY = e.clientY - interfaceContainer.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const x = e.clientX - dragOffsetX;
      const y = e.clientY - dragOffsetY;
      interfaceContainer.style.left = Math.max(0, x) + "px";
      interfaceContainer.style.top = Math.max(0, y) + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Show/hide interface
  viewerButton.addEventListener("click", () => {
    interfaceContainer.style.display = "flex";
    updateCodeView();
  });

  closeButton.addEventListener("click", () => {
    interfaceContainer.style.display = "none";
  });

  refreshButton.addEventListener("click", () => {
    updateCodeView();
  });

  // Helper functions
  const getBlockById = (target, id) => {
    return target.blocks.getBlock(id) || vm.runtime.flyoutBlocks.getBlock(id);
  };

  const getInputValue = (target, input) => {
    if (!input) return "";
    
    if (input.block) {
      const inputBlock = getBlockById(target, input.block);
      if (inputBlock) {
        return formatBlock(target, inputBlock);
      }
    }
    
    if (input.shadow) {
      const shadowBlock = getBlockById(target, input.shadow);
      if (shadowBlock) {
        return formatBlock(target, shadowBlock);
      }
    }
    
    return "";
  };

  const formatBlock = (target, block) => {
    if (!block) return "";

    // Handle special blocks
    if (block.opcode === "text") {
      const text = block.fields.TEXT?.value || "";
      return `"${text.replace(/"/g, '\\"')}"`;
    }

    if (block.opcode === "math_number") {
      return block.fields.NUM?.value || "0";
    }

    if (block.opcode === "data_variable") {
      return block.fields.VARIABLE?.value || "variable";
    }

    if (block.opcode === "data_listcontents") {
      return block.fields.LIST?.value || "list";
    }

    if (block.opcode === "argument_reporter_string_number" || block.opcode === "argument_reporter_boolean") {
      return block.fields.VALUE?.value || "parameter";
    }

    if (block.opcode === "colour_picker") {
      return block.fields.COLOUR?.value || "#000000";
    }

    // Get block name from Blockly definition
    let blockName = block.opcode;
    const blockDef = ScratchBlocks.Blocks[block.opcode];

    // Replace icons/images with text
    if (blockDef && blockDef.init) {
    try {
        let jsonData;
        const fakeBlock = {
        jsonInit(data) { jsonData = data; }
        };
        blockDef.init.call(fakeBlock);
        
        if (jsonData && jsonData.message0) {
        blockName = jsonData.message0.replace(/%\d+/g, (match) => {
            const argNum = parseInt(match.slice(1)) - 1;
            const arg = jsonData.args0?.[argNum];
            
            // Check if this is an image/icon that should be replaced
            if (arg && arg.type === "field_image") {
            const replacement = iconReplacements[block.opcode];
            return replacement ? replacement : "";
            }
            
            return "";
        });
        }
    } catch (e) {
        // Fallback to opcode
    }
    }

    // Handle procedure calls
    if (block.opcode === "procedures_call") {
      blockName = block.mutation?.proccode || "customBlock";
      blockName = blockName.replace(/%[nbs]/g, "(...)");
    }

    // Add field values and inputs
    const parts = [blockName];
    
    // Add fields (exclude hidden/collapse fields)
    for (const fieldName in block.fields) {
    const field = block.fields[fieldName];
    if (field.value !== undefined && 
        fieldName !== "VARIABLE" && 
        fieldName !== "LIST" && 
        !fieldName.toLowerCase().includes("hidden") &&
        !fieldName.toLowerCase().includes("collapse")) {
        parts.push(`[${field.value}]`);
    }
    }

    // Add inputs (exclude hidden inputs)
    for (const inputName in block.inputs) {
    if (!inputName.toLowerCase().includes("hidden")) {
        const inputValue = getInputValue(target, block.inputs[inputName]);
        if (inputValue) {
        parts.push(`(${inputValue})`);
        }
    }
    }

    return parts.join(" ");
  };

  const generateCodeForBlock = (target, blockId, indent = 0) => {
    const block = getBlockById(target, blockId);
    if (!block) return [];
    
    const indentStr = "  ".repeat(indent);
    const lines = [];
    
    const blockText = formatBlock(target, block);
    
    // Check if this is a C-block (has substack) - ignore hidden inputs
    const hasSubstack = Object.keys(block.inputs).some(key => 
    key.startsWith("SUBSTACK") && !key.includes("hidden")
    );

    if (hasSubstack) {
    // Remove hidden field values from blockText
    const cleanBlockText = blockText.replace(/\[(?:TRUE|FALSE)\]/g, '').replace(/\s+/g, ' ').trim();
    lines.push(`${indentStr}${cleanBlockText} {`);
    
    // Handle all SUBSTACK inputs (SUBSTACK, SUBSTACK2, SUBSTACK3, etc.)
    const substackKeys = Object.keys(block.inputs)
        .filter(key => key.startsWith("SUBSTACK") && !key.includes("hidden"))
        .sort();
    
    substackKeys.forEach((key, index) => {
        if (index > 0) {
        lines.push(`${indentStr}} else {`);
        }
        
        const substackId = block.inputs[key].block;
        if (substackId) {
        lines.push(...generateCodeForScript(target, substackId, indent + 1));
        }
    });
    
    lines.push(`${indentStr}}`);
    } else {
    lines.push(`${indentStr}${blockText}`);
    }
    
    return lines;
  };

  const generateCodeForScript = (target, startBlockId, indent = 0) => {
    const lines = [];
    let currentBlockId = startBlockId;
    
    while (currentBlockId) {
      const block = getBlockById(target, currentBlockId);
      if (!block) break;
      
      lines.push(...generateCodeForBlock(target, currentBlockId, indent));
      currentBlockId = block.next;
    }
    
    return lines;
  };

const updateCodeView = () => {
  const target = vm.editingTarget;
  if (!target) {
    codeContainer.innerHTML = '<div class="code-line">// No sprite selected</div>';
    return;
  }

  const scripts = [];
  const blocks = target.blocks._blocks;
  
  // Find all top-level blocks (hat blocks)
  for (const blockId in blocks) {
    const block = blocks[blockId];
    if (block.topLevel) {
      const scriptLines = generateCodeForScript(target, blockId);
      if (scriptLines.length > 0) {
        scripts.push(scriptLines.join("\n"));
      }
    }
  }

  if (scripts.length === 0) {
    codeContainer.innerHTML = '<div class="code-line">// No scripts found</div>';
  } else {
    const allLines = scripts.join("\n\n").split("\n");
    const numberedLines = allLines.map((line, index) => {
      const lineNumber = (index + 1).toString().padStart(3, " ");
      return `<div class="code-line"><span class="line-number">${lineNumber}</span><span class="line-content">${line || " "}</span></div>`;
    }).join("");
    codeContainer.innerHTML = numberedLines;
  }
};

  // Auto-update on workspace changes
  const workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener(() => {
    if (interfaceContainer.style.display !== "none") {
      updateCodeView();
    }
  });

  // Update when switching sprites
  vm.on("targetsUpdate", () => {
    if (interfaceContainer.style.display !== "none") {
      updateCodeView();
    }
  });

  // Add button to stage header
  while (true) {
    await addon.tab.waitForElement('[class*="stage-header_stage-size-row"]', {
      markAsSeen: true,
      reduxEvents: [
        "scratch-gui/mode/SET_PLAYER",
        "scratch-gui/mode/SET_FULL_SCREEN",
      ],
    });
    if (addon.tab.editorMode === "editor") {
      addon.tab.appendToSharedSpace({ 
        space: "stageHeader", 
        element: viewerButtonOuter, 
        order: 1 
      });
    }
  }
}