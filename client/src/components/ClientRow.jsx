import { useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "./mutations/clientMutations";
import { GET_CLIENTS } from "./queries/clientQueries";
import { GET_PROJECTS } from "./queries/projectQueries";
import EditClientModal from "./EditClientModal";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td className="edit-column">
        <EditClientModal
          clientInfo={client}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
        <button
          className="btn btn-success btn-sm"
          onClick={() => setEditModalOpen(true)}
        >
          <FaPencilAlt className="icon" />
        </button>
      </td>
      <td className="delete-column">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteClient()}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
