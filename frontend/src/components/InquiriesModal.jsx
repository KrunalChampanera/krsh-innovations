import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Badge, Spinner, Alert } from "react-bootstrap";
import { Database, RefreshCw, Mail, Phone, Calendar, CheckCircle } from "lucide-react";

const InquiriesModal = ({ show, onHide, dbStatus }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data || []);
      } else {
        setError(data.error || "Failed to load inquiries");
      }
    } catch (err) {
      setError("Cannot reach backend server. Ensure Express is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchInquiries();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary-subtle text-primary p-2">
            <Database size={24} />
          </div>
          <div>
            <Modal.Title className="fw-bold fs-5">
              Krsh.Innovations - Live Database & Inquiries Monitor
            </Modal.Title>
            <div className="small text-muted">
              Live records fetched from MySQL / Backend API
            </div>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* Connection status banner */}
        <div className="p-3 mb-4 rounded-3 border bg-light d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <div className="small text-muted">Backend Database Status:</div>
            <div className="d-flex align-items-center gap-2 mt-1">
              <span className={`badge ${dbStatus?.isMySQL ? "bg-success" : "bg-primary"} rounded-pill`}>
                {dbStatus?.isMySQL ? "MySQL (Active)" : "Resilient Local Store Active"}
              </span>
              <span className="small text-secondary">{dbStatus?.message}</span>
            </div>
          </div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={fetchInquiries}
            disabled={loading}
            className="rounded-pill d-flex align-items-center gap-1"
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            <span>Refresh Data</span>
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="small text-muted mt-2">Fetching records from database...</div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <Mail size={40} className="mb-2 text-secondary opacity-50" />
            <p>No inquiries found yet. Submit the contact or quote form to see new entries here!</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-light small text-uppercase">
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Contact Info</th>
                  <th>Service Requested</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="small">
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <span className="fw-bold text-muted">#{inq.id}</span>
                    </td>
                    <td>
                      <strong>{inq.name}</strong>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-primary">{inq.email}</span>
                        {inq.phone && <span className="text-muted small">{inq.phone}</span>}
                      </div>
                    </td>
                    <td>
                      <Badge bg="info-subtle" text="info-emphasis" className="border">
                        {inq.service}
                      </Badge>
                    </td>
                    <td>
                      <span className="fw-semibold text-dark">{inq.budget || "Flexible"}</span>
                    </td>
                    <td>
                      <Badge bg={inq.status === "new" ? "warning" : "success"} className="rounded-pill">
                        {inq.status || "new"}
                      </Badge>
                    </td>
                    <td className="text-muted">
                      {new Date(inq.created_at || Date.now()).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={onHide} className="rounded-pill px-4">
          Close Monitor
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InquiriesModal;
