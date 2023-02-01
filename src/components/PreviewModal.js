import React from "react";

const PreviewModal = (props) => {
  const toggleModal = () => {
    props.toggleModal();
  };

  console.log(props.published);

  return (
    <div>
      <div className="modal is-active">
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Post Preview</p>
              <button className="delete" onClick={() => toggleModal()} />
            </header>
            <section className="modal-card-body">
              <div className="content">
                <h1>{props.title}</h1>
                <p>{props.content}</p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <p>
                <em>
                  Currently published:
                  {props.published === true ? <em> Yes</em> : <em> No</em>}
                </em>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
