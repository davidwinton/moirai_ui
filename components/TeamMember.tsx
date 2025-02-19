import React, { useState } from "react"
import { HarmonicPersonResponse, HarmonicExperience } from "types/harmonicResponse"

interface TeamMemberProps {
  person: HarmonicPersonResponse
  companyId: string
}

const extractPersonId = (field: string) => {
  const match = field.match(/urn:harmonic:person:(\d+)/);
  return match ? match[1] : null;
};

const sortByStartDate = (a: HarmonicExperience, b: HarmonicExperience) => {
  const dateA = a.start_date ? new Date(a.start_date).getTime() : 0;
  const dateB = b.start_date ? new Date(b.start_date).getTime() : 0;
  return dateB - dateA; // Most recent first
};

export const TeamMember: React.FC<TeamMemberProps> = ({ person, companyId }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const matchingExperience = person?.experience?.find(
    (experience) => {
      if (!experience.company) return false;
      const parts = experience.company.split(':');
      return parts[parts.length - 1] === companyId;
    }
  );

  const pastExperiences = person?.experience?.sort(sortByStartDate);

  return (
    <div>
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
        onClick={() => setExpanded(!expanded)}
      >
        <a href={person.socials?.LINKEDIN?.url || ''} target="_blank" rel="noopener noreferrer">
          <img
            src={person.profile_picture_url || "https://via.placeholder.com/50"}
            alt={person.full_name}
            className="w-12 h-12 rounded-full border mr-3"
          />
        </a>
        <div className="flex-1">
          <p className="font-semibold">{person.full_name}</p>
          <p className="text-gray-600">{matchingExperience?.title}</p>
        </div>
        
        <button className="text-gray-500">▼</button>
      </div>

      {/* Expanded Content (Past Experience) */}
      {expanded && (

        <div className="bg-gray-50 p-4">
          <p className="mb-2 text-sm text-gray-700">{matchingExperience?.description || "No description available"}</p>
          <h4 className="text-md font-semibold mb-2">Past Experience</h4>
          <ul className="space-y-2">
            {pastExperiences?.map((exp, expIndex) => (
              <li key={expIndex} className="border p-2 rounded-md bg-white">
                <p className="font-semibold">{exp.title} @ {exp.company_name || "Unknown Company"}</p>
                <p className="text-sm text-gray-600">{exp.start_date ? new Date(exp.start_date).getFullYear() : "N/A"} - {exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"}</p>
                <p className="text-xs text-gray-700">{exp.description || "No details provided"}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div >
  );
};
