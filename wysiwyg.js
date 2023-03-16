function WYSIWYG(el) {
    var menu = document.createElement('menu-tray');
    var editor = document.createElement('div');
    editor.textContent = el.value;
    editor.style = el.style;
    editor.contentEditable = true;
    var boldBtn = document.createElement('button');
    boldBtn.innerHTML = '<b>B</b>';
    boldBtn.setAttribute('type', 'button');
    var underlineBtn = document.createElement('button');
    underlineBtn.innerHTML = '<u>U</u>';
    underlineBtn.setAttribute('type', 'button');
    var italicBtn = document.createElement('button');
    italicBtn.innerHTML = '<i>I</i>';
    italicBtn.setAttribute('type', 'button');
    var linkBtn = document.createElement('button');
    linkBtn.textContent = '🔗';
    linkBtn.setAttribute('type', 'button');
    var h1Btn = document.createElement('button');
    h1Btn.innerHTML = 'H1';
    h1Btn.setAttribute('type', 'button');
    var h2Btn = document.createElement('button');
    h2Btn.innerHTML = 'H2';
    h2Btn.setAttribute('type', 'button');
    var quoteBtn = document.createElement('button');
    quoteBtn.innerHTML = '"';
    quoteBtn.setAttribute('type', 'button');
    var normalBtn = document.createElement('button');
    normalBtn.innerHTML = 'N';
    normalBtn.setAttribute('type', 'button');
    var hrBtn = document.createElement('button');
    hrBtn.textContent = '–';
    hrBtn.setAttribute('type', 'button');
    menu.appendChild(boldBtn);
    menu.appendChild(underlineBtn);
    menu.appendChild(italicBtn);
    menu.appendChild(linkBtn);
    menu.appendChild(h1Btn);
    menu.appendChild(h2Btn);
    menu.appendChild(quoteBtn);
    menu.appendChild(normalBtn);
    menu.appendChild(hrBtn);

    // Add event listeners to editor and style buttons
    editor.addEventListener('input', updateStyle);
    editor.addEventListener('keyup', updateStyle);
//    editor.addEventListener('blur', hideMenu);
    editor.addEventListener('focus', updateStyle);
    editor.addEventListener('mouseup', updateStyle);
    boldBtn.addEventListener('click', toggleBold);
    underlineBtn.addEventListener('click', toggleUnderline);
    linkBtn.addEventListener('click', toggleLink);
    h1Btn.addEventListener('click', toggleH1);
    h2Btn.addEventListener('click', toggleH2);
    quoteBtn.addEventListener('click', toggleQuote);
    italicBtn.addEventListener('click', toggleItalic);
    normalBtn.addEventListener('click', toggleNormal);
    hrBtn.addEventListener('click', insertHR);

    function hideMenu() {
        menu.style.display = 'none';
    }
    // Update style buttons on selection change
    function updateStyle() {
        el.value = editor.innerHTML;
        var selection = window.getSelection();
        // get the current selection

        // check if there is a selection
        if (selection.toString().length > 0) {
            // show the menu tray
            menu.style.display = 'block';

            // get the bounding rect of the selection
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // position the menu tray above or below the middle of the selected text
            const middle = (rect.top + rect.bottom) / 2;
            if (middle < window.innerHeight / 2) {
                menu.style.top = `${rect.bottom + window.pageYOffset}px`;
                menu.style.borderTopLeftRadius = '0px';
                menu.style.borderBottomLeftRadius = '100px';
            } else {
                menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
                menu.style.borderTopLeftRadius = '100px';
                menu.style.borderBottomLeftRadius = '0px';
            }
            menu.style.left = `${rect.left + window.pageXOffset}px`;
        } else {
            // hide the menu tray
            menu.style.display = 'none';
        }
        if (selection.rangeCount && selection.getRangeAt) {
            var range = selection.getRangeAt(0);
            var node = range.commonAncestorContainer;
            var boldApplied = false;
            var underlineApplied = false;
            var linkApplied = false;
            var h1Applied = false;
            var h2Applied = false;
            var quoteApplied = false;
            var italicApplied = false;

            while (node) {
                if (node.nodeType == 1 && node.nodeName == 'B') {
                    boldApplied = true;
                }
                if (node.nodeType == 1 && node.nodeName == 'U') {
                    underlineApplied = true;
                }
                if (node.nodeType == 1 && node.nodeName == 'A') {
                    linkApplied = true;
                }
                if (node.nodeType == 1 && node.nodeName == 'H1') {
                    h1Applied = true;
                }
                if (node.nodeType == 1 && node.nodeName == 'H2') {
                    h2Applied = true;
                }
                if (node.nodeType == 1 && node.nodeName == 'BLOCKQUOTE') {
                    quoteApplied = true;
                }
                if (node.nodeType == 1 && node.nodeName == 'I') {
                    italicApplied = true;
                }
                node = node.parentNode;
            }

            boldBtn.classList.toggle('active', boldApplied);
            underlineBtn.classList.toggle('active', underlineApplied);
            linkBtn.classList.toggle('active', linkApplied);
            h1Btn.classList.toggle('active', h1Applied);
            h2Btn.classList.toggle('active', h2Applied);
            quoteBtn.classList.toggle('active', quoteApplied);
            italicBtn.classList.toggle('active', italicApplied);
        }
    }

    // Toggle bold text
    function toggleBold() {
        document.execCommand('bold', false, null);
    }

    // Toggle underlined text
    function toggleUnderline() {
        document.execCommand('underline', false, null);
    }

    // Toggle linked text
    function toggleLink() {
        var url = prompt("Enter URL:");
        document.execCommand('createLink', false, url);
    }

    // Toggle H1 text
    function toggleH1() {
        document.execCommand('formatBlock', false, 'H1');
    }

    // Toggle H2 text
    function toggleH2() {
        document.execCommand('formatBlock', false, 'H2');
    }

    // Toggle quoted text
    function toggleQuote() {
        document.execCommand('formatBlock', false, 'BLOCKQUOTE');
    }

    // Toggle italic text
    function toggleItalic() {
        document.execCommand('italic', false, null);
    }

    // Toggle normal text size
    function toggleNormal() {
        document.execCommand('formatBlock', false, 'div')

        ////            document.execCommand('removeFormat', false, null);
        //// get the current selection
        //    const selection = window.getSelection();
        //
        //    // get the range of the selection
        //    const range = selection.getRangeAt(0);
        //
        //    // check if the selected text is wrapped in an H1 or H2 tag
        //    const parentNode = range.commonAncestorContainer.parentNode;
        //    if (parentNode.nodeName === 'H1' || parentNode.nodeName === 'H2') {
        //        // remove the H1 or H2 tag
        //        const textNode = parentNode.firstChild;
        //        range.selectNode(textNode);
        //        document.execCommand('removeFormat');
        //    } else {
        //        // clear any other formatting
        //        document.execCommand('removeFormat');
        //    }
        this.getEditor = function () {
            return editor;
        };
    }

    // Insert HR line
    function insertHR() {
        document.execCommand('insertHorizontalRule', false, null);
    }
    var parent = el.parentElement;
    parent.insertBefore(editor, el.nextSibling);
    menu.classList.add('wysiwygmt')
    editor.classList.add('wysiwyge')
    parent.insertBefore(menu, el.nextSibling);
    function setText(text) {
        editor.textContent = text;
    }
    function setHTML(text) {
        editor.innerHTML = text;
    }
}
