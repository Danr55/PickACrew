import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API.tsx';
import Candidate from '../interfaces/Candidate.interface.tsx';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSavedCandidates = (): Candidate[] => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  };

  const saveCandidate = (candidate: Candidate) => {
    const savedCandidates = getSavedCandidates();
    if (!savedCandidates.some(saved => saved.login === candidate.login)) {
      const updatedCandidates = [...savedCandidates, candidate];
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
  };

  const fetchUserDetails = async (username: string) => {
    const details = await searchGithubUser(username);
    return details;
  };

  const loadNextCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const candidates = await searchGithub();
      if (candidates.length === 0) {
        setError('No more candidates available');
        setCurrentCandidate(null);
        return;
      }
      
      const details = await fetchUserDetails(candidates[0].login);
      setCurrentCandidate(details);
    } catch (err) {
      setError('Error loading candidate');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNextCandidate();
  }, []);

  const handleAccept = () => {
    if (currentCandidate) {
      saveCandidate(currentCandidate);
      loadNextCandidate();
    }
  };

  const handleReject = () => {
    loadNextCandidate();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentCandidate) {
    return <div>No candidates available</div>;
  }

  return (
    <div>
      <div>
        <img
          src={currentCandidate.avatar_url}
          alt={`${currentCandidate.login}'s avatar`}
        />
        <div>
          <h2>{currentCandidate.name || currentCandidate.login}</h2>
          <p>@{currentCandidate.login}</p>
          
          {currentCandidate.location && (
            <div>
              <span>Location: {currentCandidate.location}</span>
            </div>
          )}
          {currentCandidate.company && (
            <div>
              <span>Company: {currentCandidate.company}</span>
            </div>
          )}
          {currentCandidate.email && (
            <div>
              <span>Email: {currentCandidate.email}</span>
            </div>
          )}
          <div>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        </div>
      </div>
      
      <div>
        <button onClick={handleReject}>Skip</button>
        <button onClick={handleAccept}>Save</button>
      </div>
    </div>
  );
};

export default CandidateSearch;