import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENT } from "../queries/clientQueries";

export default function AddClientModal() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },

        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENT,
            });

            cache.writeQuery({
                query: GET_CLIENT,
                data: { clients: [...clients, addClient] },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            return alert("All fields need to be filled");
        }
        addClient(name, email, phone);
        setName("");
        setPhone("");
        setEmail("");

        // -----
        // This part is to close modal after submit
        const addClientModal = document.getElementById("addClientModal");
        if (addClientModal) {
            addClientModal.classList.remove("show");
            addClientModal.style.display = "none";
            const modalBackdrop = document.querySelector(".modal-backdrop");
            if (modalBackdrop) {
                document.body.classList.remove("modal-open");
                document.body.removeChild(modalBackdrop);
            }
        }
        // -----
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#addClientModal"
            >
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Add Client</div>
                </div>
            </button>

            <div
                className="modal"
                id="addClientModal"
                role="dialog"
                aria-labelledby="addClientModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="addClientModalLabel"
                            >
                                Add Client
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    // data-bs-dismiss="modal"
                                    className="btn btn-secondary"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
