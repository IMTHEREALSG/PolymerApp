import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './note-input.js';
import './noteList.js';


class QuickNotesApp extends PolymerElement {
  static get properties() {
    return {
      notes: {
        type: Array,
        value: () => [],
      },
      viewMode: {
        type: String,
        value: 'grid',
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 16px;
          padding: 24px;
          margin: 20px 0;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding: 20px 24px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .app-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .view-controls {
          display: flex;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          padding: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .view-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 80px;
        }

        .view-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          transform: translateY(-1px);
        }

        .view-btn.active {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
          transform: translateY(-1px);
        }

        .view-btn.active:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .stats {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          flex: 1;
          min-width: 120px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 4px;
          display: block;
        }

        .stat-label {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .content {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="app-container">
        <div class="header">
          <h1 class="app-title">✍️ QuickNotes</h1>
          <div class="view-controls">
            <button class$="view-btn [[_computeActive(viewMode, 'grid')]]" on-click="_setGridView" aria-label="Grid view">📋 Grid</button>
            <button class$="view-btn [[_computeActive(viewMode, 'list')]]" on-click="_setListView" aria-label="List view">📄 List</button>
          </div>
        </div>

        <div class="stats">
          <div class="stat-card">
            <span class="stat-number">[[notes.length]]</span>
            <span class="stat-label">Total Notes</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">[[_getNotesThisWeek(notes)]]</span>
            <span class="stat-label">This Week</span>
          </div>
        </div>

        <div class="content">
          <note-input 
            on-note-saved="_noteSaved"
            on-note-cancelled="_noteCancelled"
            on-note-updated="_noteUpdated">
          </note-input>

          <notes-list 
            notes="[[notes]]"
            layout="[[viewMode]]"
            on-note-deleted="_noteDeleted"
            on-note-edited="_noteEdited">
          </notes-list>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadNotes();
  }

  _setGridView() {
    this.viewMode = 'grid';
  }

  _setListView() {
    this.viewMode = 'list';
  }

  _computeActive(viewMode, type) {
    return viewMode === type ? 'active' : '';
  }

  _noteSaved(e) {
    const newNote = e.detail;
    this.push('notes', newNote);
    this._saveNotes();
  }

  _noteCancelled() {
    console.log('Note input cancelled');
  }

  _loadNotes() {
    const saved = localStorage.getItem('qnotes');
    if (saved) {
      try {
        this.notes = JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse notes', err);
        this.notes = [];
      }
    }
  }

  _saveNotes() {
    localStorage.setItem('qnotes', JSON.stringify(this.notes));
  }

  _noteDeleted(e) {
    const id = e.detail.id;
    this.notes = this.notes.filter(n => n.id !== id);
    this._saveNotes();
  }

  _noteUpdated(e) {
    const updated = e.detail;
    this.notes = this.notes.map(note => note.id === updated.id ? updated : note);
    this._saveNotes();
  }

  _noteEdited(e) {
    const note = e.detail.note;
    const input = this.shadowRoot.querySelector('note-input');
    if (input && input.startEdit) {
      input.startEdit(note);
    }
  }

  _getNotesThisWeek(notes) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return notes.filter(n => new Date(n.createdAt) > weekAgo).length;
  }
}

customElements.define('quick-notes-app', QuickNotesApp);
