import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectMaterialsPage.css';

const MaterialCard = ({ item, onSelectPart }) => (
  <div className={`material-card ${item.selected ? 'selected' : ''}`}>
    <div className="material-icon">📄</div>
    <div className="material-body">
      <div className="material-title">{item.title}</div>
      <div className="material-sub">What part of this material do you want to use?</div>
      <div className="material-actions">
        <button className={`chip ${item.selectedPart === 'notes' ? 'chip-active' : ''}`} onClick={() => onSelectPart(item.id, 'notes')}>Notes</button>
        <button className={`chip ${item.selectedPart === 'content' ? 'chip-active' : ''}`} onClick={() => onSelectPart(item.id, 'content')}>Document Content</button>
      </div>
    </div>
  </div>
);

export default function SelectMaterialsPage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [materials, setMaterials] = useState([]);

  /*
  // Temporarily disabled fetching materials from backend
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // NOTE: change endpoint if your backend uses a different path
        const res = await auth.fetchWithAuth('http://127.0.0.1:8000/api/materials/');
        if (!res.ok) throw new Error('Failed to load materials');
        const data = await res.json();
        if (!mounted) return;
        // Expecting data to be an array of { id, title, ... }
        const mapped = (Array.isArray(data) ? data : [])
          .map(d => ({ id: d.id || d.pk || d.slug || d.title, title: d.title || d.name || 'Untitled', selectedPart: null, selected: false }))
          // hide placeholder/empty titled documents
          .filter(m => !(typeof m.title === 'string' && /^untitled\si.test(m.title.trim())));
        setMaterials(mapped);
      } catch (e) {
        console.error(e);
        if (mounted) setError(String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);
*/
  function handleUploadClick() {
    if (fileRef.current) fileRef.current.click();
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const newItems = files.map(f => ({ id: `${Date.now()}-${f.name}`, title: f.name, file: f, selectedPart: null, selected: true }));
    setMaterials(prev => [...newItems, ...prev]);
    // clear the input so same file can be selected again if needed
    e.target.value = '';
  }

  function handleSelectPart(id, part) {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, selectedPart: part } : m));
  }

  function handleContinue() {
    // persist selected materials and choices
    const chosen = materials.map(m => ({ title: m.title, selectedPart: m.selectedPart }));
    try { sessionStorage.setItem('pendingTestMaterials', JSON.stringify(chosen)); } catch (e) { console.error(e); }
    navigate('/tests');
  }

  return (
  <div className="select-materials-page">
      <div className="page-top">
        <div>
          <h1>Select Materials</h1>
          <p className="subtitle">Select the materials you want to generate the test off of.</p>
        </div>
        <div className="top-actions">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Back</button>
          <button className="btn btn-primary" onClick={handleContinue}>Continue</button>
        </div>
      </div>

      <div className="materials-area">
        <div className="upload-card" onClick={handleUploadClick} role="button" tabIndex={0}>+ Upload New Material</div>
        {/* hidden file input */}
        <input ref={fileRef} type="file" multiple style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf,.docx,.doc,.txt,.md" />

        {materials.map(item => (
          <MaterialCard key={item.id} item={item} onSelectPart={handleSelectPart} />
        ))}
      </div>

      <div className="search-row">
        <input placeholder="Search for materials" className="search-input" />
      </div>

      <details className="advanced"> 
        <summary>Advanced</summary>
      </details>
    </div>
  );
}
