import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';

class NoteInput extends PolymerElement {
  static get properties() {
    return {
      title: {
        type: String,
        value: ''
      },
      content: {
        type: String,
        value: ''
      },
      collapsed: {
        type: Boolean,
        value: true
      },
      buttonText: {
        type: String,
        value: 'Save'
      },
      isEditing: {
        type: Boolean,
        value: false
      },
      editingNote: {
        type: Object,
        value: null
      }
    };
  }

  static get template() {
    return html`
      <style>
         :host {
            display: block;
            width: 100%;
            max-width: 600px;
            margin: 0 auto 24px auto;
        }

        .note-input {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border: 1px solid #e5e7eb;
            padding: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .note-input:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            border-color: #d1d5db;
        }

        .note-input.collapsed {
            padding: 12px 16px;
            cursor: pointer;
        }

        .note-input.collapsed:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .title-input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            background: transparent;
            padding: 8px 0;
            margin-bottom: 8px;
            border-bottom: 2px solid transparent;
            transition: all 0.2s ease;
            font-family: inherit;
            resize: none;
        }

        .title-input:focus {
            border-bottom-color: #3b82f6;
        }

        .title-input::placeholder {
            color: #9ca3af;
            font-weight: 400;
            font-size: 16px;
        }

        .note-input.collapsed .title-input::placeholder {
            color: #6b7280;
            font-size: 15px;
        }

        .content-input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 14px;
            color: #374151;
            background: transparent;
            resize: vertical;
            min-height: 80px;
            max-height: 300px;
            padding: 8px 0;
            margin-bottom: 16px;
            font-family: inherit;
            line-height: 1.6;
            transition: opacity 0.3s ease, max-height 0.3s ease;
        }

        .content-input::placeholder {
            color: #9ca3af;
            font-style: italic;
        }

        .note-input.collapsed .content-input {
            opacity: 0;
            max-height: 0;
            margin: 0;
            padding: 0;
            pointer-events: none;
        }

        .actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #f3f4f6;
            transition: opacity 0.3s ease, max-height 0.3s ease;
        }

        .note-input.collapsed .actions {
            opacity: 0;
            max-height: 0;
            padding: 0;
            border: none;
            pointer-events: none;
        }

        .save, .cancel {
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 70px;
            font-family: inherit;
            position: relative;
            overflow: hidden;
        }

        .save {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }

        .save:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .save:active {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .save:disabled {
            background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .cancel {
            background: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
        }

        .cancel:hover {
            background: #f1f5f9;
            color: #475569;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .cancel:active {
            transform: translateY(0);
            background: #e2e8f0;
        }

        /* Focus states for accessibility */
        .save:focus-visible, .cancel:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
            :host {
                margin: 0 16px 20px 16px;
            }
            
            .note-input {
                border-radius: 8px;
                padding: 12px;
            }
            
            .actions {
                flex-direction: column-reverse;
                gap: 8px;
            }
            
            .save, .cancel {
                width: 100%;
                padding: 12px 16px;
                font-size: 15px;
            }

            .title-input {
                font-size: 16px; /* Prevents zoom on iOS */
            }
        }

        .save.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid transparent;
            border-top: 2px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .note-input.collapsed .title-input {
            cursor: pointer;
            padding: 12px 0;
        }

        .note-input:not(.collapsed) {
            animation: expandIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes expandIn {
            0% {
                max-height: 60px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }
            100% {
                max-height: 400px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            }
        }
      </style>

      <div class$="note-input [[_computeClass(collapsed)]]">
        <input
          class="title-input"
          type="text"
          placeholder$="[[_computeTitlePlaceholder(collapsed)]]"
          value="{{title::input}}"
          on-focus="_expandInput"
        />

        <template is="dom-if" if="[[!collapsed]]">
          <textarea
            class="content-input"
            placeholder="Write your thoughts here..."
            value="{{content::input}}"
            on-keydown="_handleKeydown"
          ></textarea>

          <div class="actions">
            <button class="cancel" on-click="cancelNote">Cancel</button>
            <button class="save" disabled$="[[!_hasContent(title, content)]]" on-click="saveNote">
              [[buttonText]]
            </button>
          </div>
        </template>
      </div>
    `;
  }

  _computeClass(collapsed) {
    return collapsed ? 'collapsed' : '';
  }

  _computeTitlePlaceholder(collapsed) {
    return collapsed ? 'Take a note...' : 'Note title (optional)';
  }

  _hasContent(title, content) {
    return (title && title.trim()) || (content && content.trim());
  }

  _expandInput() {
    this.collapsed = false;
  }

  _handleKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (this._hasContent(this.title, this.content)) {
        this.saveNote();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.cancelNote();
    }
  }

  saveNote() {
    if (!this._hasContent(this.title, this.content)) return;

    if (this.isEditing && this.editingNote) {
      const updatedNote = {
        ...this.editingNote,
        title: this.title.trim(),
        content: this.content.trim(),
        updatedAt: new Date().toISOString()
      };
      this.dispatchEvent(new CustomEvent('note-updated', {
        detail: updatedNote,
        bubbles: true,
        composed: true
      }));
    } else {
      const newNote = {
        id: Date.now().toString(),
        title: this.title.trim(),
        content: this.content.trim(),
        createdAt: new Date().toISOString()
      };
      this.dispatchEvent(new CustomEvent('note-saved', {
        detail: newNote,
        bubbles: true,
        composed: true
      }));
    }

    this.title = '';
    this.content = '';
    this.collapsed = true;
    this.buttonText = 'Save';
    this.isEditing = false;
    this.editingNote = null;
  }

  cancelNote() {
    this.dispatchEvent(new CustomEvent('note-cancelled', {
      bubbles: true,
      composed: true
    }));

    this.title = '';
    this.content = '';
    this.collapsed = true;
    this.buttonText = 'Save';
    this.isEditing = false;
    this.editingNote = null;
  }

  startEdit(note) {
    this.title = note.title || '';
    this.content = note.content || '';
    this.collapsed = false;
    this.isEditing = true;
    this.editingNote = note;
    this.buttonText = 'Update';

    setTimeout(() => {
      const input = this.shadowRoot.querySelector('.title-input');
      if (input) input.focus();
    }, 0);
  }
}

customElements.define('note-input', NoteInput);
