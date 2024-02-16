import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CLIENT } from "./mutations/clientMutations";
import { GET_CLIENTS, GET_CLIENT } from "./queries/clientQueries";
import { FaPencilAlt } from "react-icons/fa";

export default function EditClientModal({ clientInfo, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { data } = useQuery(GET_CLIENT, {
    variables: { id: clientInfo?.id },
    skip: !clientInfo?.id,
  });

  useEffect(() => {
    if (data && !clientInfo) {
      setName(data.client.name || "");
      setEmail(data.client.email || "");
      setPhone(data.client.phone || "");
    }
  }, [data, clientInfo]);

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: clientInfo?.id, name, email, phone },
    refetchQueries: [
      {
        query: GET_CLIENTS,
      },
    ],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!clientInfo?.id || !name || !email || !phone) {
      return alert("Please fill in all fields");
    }

    updateClient();
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setName(clientInfo?.name || "");
      setEmail(clientInfo?.email || "");
      setPhone(clientInfo?.phone || "");
    }
  }, [isOpen, clientInfo]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="modal fade show"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog"
            role="document"
            style={{ textAlign: "left" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title secondary-color">Edit Client</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3 justify-content-left">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
