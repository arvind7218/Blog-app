import React, { useState } from "react";

const UpdateBlog = () => {
  const [formData, setFormData] = useState({
    email: "",
    selectOption: "1",
    multiSelect: [],
    textarea: "",
  });

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="selectOption">Example select</label>
        <select
          className="form-control"
          id="selectOption"
          name="selectOption"
          value={formData.selectOption}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="multiSelect">Example multiple select</label>
        <select
          multiple
          className="form-control"
          id="multiSelect"
          name="multiSelect"
          value={formData.multiSelect}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="textarea">Example textarea</label>
        <textarea
          className="form-control"
          id="textarea"
          name="textarea"
          rows="3"
          value={formData.textarea}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UpdateBlog;
