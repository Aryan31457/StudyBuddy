import React, { useEffect, useState } from 'react';
import api from '../../api/productivity';

export default function FlashcardStudy() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const token = localStorage.getItem('access_token');

  const loadDue = async () => {
    if (!token) return;
    const resp = await api.fetchFlashcards(token, { due: true });
    setCards(resp.data);
    setIndex(0);
    setShowBack(false);
  };

  useEffect(()=>{ loadDue(); }, []);

  const mark = async (quality) => {
    if (!cards[index]) return;
    await api.reviewFlashcard(token, cards[index].id, quality);
    // reload due cards
    await loadDue();
  };

  if (!token) return <div>Please login to review flashcards</div>;
  if (!cards.length) return <div>No flashcards due. Create some or come back later.</div>;

  const card = cards[index];

  return (
    <div>
      <h3>Flashcard Review</h3>
      <div style={{border:'1px solid #ccc', padding:16, marginBottom:8}}>
        <div><strong>Front</strong></div>
        <div>{card.front}</div>
        {showBack && <>
          <hr/>
          <div><strong>Back</strong></div>
          <div>{card.back}</div>
        </>}
      </div>
      <button onClick={()=>setShowBack(s=>!s)}>{showBack ? 'Hide Answer' : 'Show Answer'}</button>
      <div style={{marginTop:8}}>
        <button onClick={()=>mark(5)}>Perfect</button>
        <button onClick={()=>mark(4)}>Good</button>
        <button onClick={()=>mark(2)}>Hard</button>
        <button onClick={()=>mark(0)}>Forgot</button>
      </div>
      <div style={{marginTop:12}}>
        <button onClick={()=>setIndex(i=>Math.max(0,i-1))}>Prev</button>
        <button onClick={()=>setIndex(i=>Math.min(cards.length-1,i+1))}>Next</button>
      </div>
    </div>
  );
}
