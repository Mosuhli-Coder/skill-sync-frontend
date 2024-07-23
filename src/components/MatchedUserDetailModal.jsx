import ReactDOM from 'react-dom';

const MatchedUserDetailModal = ({ user, matchedSkills, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded shadow-md w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
        <p className="text-sm text-gray-600 hidden">{user.email}</p>
        <div className="mt-4">
          <h4 className="font-medium">Matched Skills:</h4>
          <ul className="list-disc list-inside mt-2">
            {matchedSkills.map((skill) => (
              <li key={skill._id} className="mt-2">
                <h5 className="font-semibold">{skill.name}</h5>
                <p><strong>Years of Experience:</strong> {skill.yearsOfExperience}</p>
                <p><strong>Level:</strong> {skill.level}</p>
                <p><strong>Certifications:</strong> {skill.certifications.join(', ')}</p>
                <p><strong>Description:</strong> {skill.description}</p>
                <p><strong>Tools:</strong> {skill.tools.join(', ')}</p>
                <p><strong>Projects:</strong> {skill.projects.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MatchedUserDetailModal;
