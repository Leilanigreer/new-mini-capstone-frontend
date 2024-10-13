import "./Modal.css";

export function ProductUpdateModal({ children, edit, onClose }) {
  if (edit) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          {children}
          <button className="close" type="button" onClick={onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}