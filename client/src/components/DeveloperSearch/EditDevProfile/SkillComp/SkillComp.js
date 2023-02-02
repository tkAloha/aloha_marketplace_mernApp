import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SkillComp = ({ skill, index, deleteSkill, onSkillsChange, errors }) => {
  return (
    <>
      <div className="input-field-row" key={index}>
        <input
          name="name"
          type="text"
          value={skill.name}
          onChange={(event) => {
            onSkillsChange(event, index);
          }}
          placeholder={`skill ${index + 1}`}
        />
        <input
          name="value"
          type="number"
          value={skill.value}
          onChange={(event) => {
            onSkillsChange(event, index);
          }}
          placeholder="0"
          min="1"
        />
        {index !== 0 ? (
          <button
            type="button"
            className="delete-icon"
            onClick={() => {
              deleteSkill(index);
            }}
          >
            <MdOutlineDeleteOutline />
          </button>
        ) : null}
      </div>
      <div className="error-row">
        <p className="error">{errors?.name}</p>
      </div>
    </>
  );
};

export default SkillComp;
