import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';

class NotesList extends PolymerElement {
  static get properties() {
    return {
      notes: {
        type: Array,
        value: () => [],
      },
      layout: {
        type: String,
        value: 'grid',
      },
    };
  }

  static get template() {
    return html`
      <style>
          :host {
            display: block;
            width: 100%;
        }

        .notes-list {
            display: grid;
            gap: 20px;
            padding: 20px 0;
            transition: all 0.3s ease;
        }

        .notes-list.grid-layout {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .notes-list.list-layout {
            grid-template-columns: 1fr;
            max-width: 800px;
            margin: 0 auto;
        }

        .note-card {
            background: #ffffff;
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }

        .note-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            border-color: #d1d5db;
        }

        .note-card:active {
            transform: translateY(0);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .note-title {
            margin: 0 0 12px 0;
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            line-height: 1.3;
            word-wrap: break-word;
        }

        .list-layout .note-title {
            font-size: 20px;
            margin-bottom: 8px;
        }

        .note-content {
            margin: 0 0 20px 0;
            font-size: 14px;
            line-height: 1.6;
            color: #374151;
            word-wrap: break-word;
            white-space: pre-wrap;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .list-layout .note-content {
            font-size: 15px;
            -webkit-line-clamp: 3;
            margin-bottom: 16px;
        }

        .note-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #f3f4f6;
        }

        .note-date {
            font-size: 12px;
            color: #6b7280;
            font-weight: 500;
        }

        .list-layout .note-date {
            font-size: 13px;
        }
        
        .note-actions {
        display: flex;
        gap: 8px;
        align-items: center;
    }

        .edit-btn {
            background: transparent;
            border: 1px solid #e5e7eb;
            color: #6b7280;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            opacity: 0;
            transform: translateX(10px);
        }

        .delete-btn {
            background: transparent;
            border: 1px solid #e5e7eb;
            color: #6b7280;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            opacity: 0;
            transform: translateX(10px);
        }
        
        .note-card:hover .edit-btn {
        opacity: 1;
        transform: translateX(0);
    }

        .note-card:hover .delete-btn {
            opacity: 1;
            transform: translateX(0);
        }

        .edit-btn:hover {
            background: #dbeafe;
            border-color: #93c5fd;
            color:#2563eb;
            transform: translateY(-1px);
        }

        .delete-btn:hover {
            background: #fee2e2;
            border-color: #fca5a5;
            color: #dc2626;
            transform: translateY(-1px);
        }


        .edit-btn:active {
        transform: translateY(0);
        background: #bfdbfe;
    }

        .delete-btn:active {
            transform: translateY(0);
            background: #fecaca;
        }

        /* No Notes State */
        .no-notes {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: #6b7280;
            font-size: 16px;
            background: #ffffff;
            border-radius: 12px;
            border: 2px dashed #e5e7eb;
            margin: 20px;
        }

        .no-notes::before {
            content: '📝';
            display: block;
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
        }

        @media (max-width: 768px) {
            .notes-list {
                padding: 16px;
                gap: 16px;
            }

            .notes-list.grid-layout {
                grid-template-columns: 1fr;
            }

            .note-card {
                padding: 16px;
            }

            .note-title {
                font-size: 16px;
            }

            .note-content {
                font-size: 14px;
                -webkit-line-clamp: 4;
            }

            .edit-btn {
            opacity: 1;
            transform: translateX(0);
            font-size: 11px;
            padding: 4px 8px;
        }

            .delete-btn {
                opacity: 1;
                transform: translateX(0);
                font-size: 11px;
                padding: 4px 8px;
            }

            .no-notes {
                padding: 40px 20px;
                margin: 10px;
                font-size: 14px;
            }

            .no-notes::before {
                font-size: 36px;
                margin-bottom: 12px;
            }
        }

        .note-card {
            animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideInUp {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .list-layout .note-card {
            display: flex;
            flex-direction: column;
            min-height: auto;
        }

        .list-layout .note-card:hover {
            transform: translateX(4px);
        }

        .edit-btn:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
        .delete-btn:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }

        .note-card:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }

        .note-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 8px;
            height: 20px;
            margin-bottom: 8px;
        }

        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
      </style>

      <div class$="notes-list [[_computeLayoutClass(layout)]]">
        <template is="dom-if" if="[[!notes.length]]">
          <div class="no-notes">
            <div>No notes yet</div>
            <div style="font-size: 14px; margin-top: 8px; opacity: 0.7;">
              Click "Take a note..." above to get started
            </div>
          </div>
        </template>

        <template is="dom-repeat" items="[[notes]]" as="note">
          <div class="note-card" tabindex="0">
            <template is="dom-if" if="[[note.title]]">
              <h3 class="note-title">[[note.title]]</h3>
            </template>
            <p class="note-content">[[note.content]]</p>
            <div class="note-footer">
              <span class="note-date">[[_formatDate(note.createdAt)]]</span>
              <div class="note-actions">
                <button class="edit-btn" on-click="_onEdit">Edit</button>
                <button class="delete-btn" on-click="_onDelete">Delete</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    `;
  }

  _computeLayoutClass(layout) {
    return layout === 'list' ? 'list-layout' : 'grid-layout';
  }

  _formatDate(date) {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  _onEdit(e) {
    const note = e.model && e.model.note ? e.model.note : null;
    this.dispatchEvent(new CustomEvent('note-edited', {
      detail: { note },
      bubbles: true,
      composed: true
    }));
  }

  _onDelete(e) {
    const note = e.model && e.model.note ? e.model.note : null;
    if (note && note.id) {
      this.dispatchEvent(new CustomEvent('note-deleted', {
        detail: { id: note.id },
        bubbles: true,
        composed: true
      }));
    }
  }
}

customElements.define('notes-list', NotesList);
