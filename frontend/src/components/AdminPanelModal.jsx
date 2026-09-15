import React, { useState, useEffect } from "react";
import {
  Modal,
  Tab,
  Nav,
  Table,
  Button,
  Badge,
  Form,
  Row,
  Col,
  Alert,
  Card,
  Spinner
} from "react-bootstrap";
import {
  Database,
  Mail,
  Image as ImageIcon,
  PlusCircle,
  Trash2,
  Edit,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  DollarSign,
  Layers
} from "lucide-react";

const AdminPanelModal = ({ show, onHide, onGalleryUpdated, dbStatus }) => {
  const [activeTab, setActiveTab] = useState("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesFilter, setInquiriesFilter] = useState("all");
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Gallery State
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    id: null,
    title: "",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tech_stack: "React 18, Node.js, MySQL",
    description: "",
    project_url: "https://github.com"
  });
  const [isEditingGallery, setIsEditingGallery] = useState(false);

  // Quotes State
  const [quotes, setQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  // Feedback Notification
  const [alertMsg, setAlertMsg] = useState(null);

  // Fetch Inquiries
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  // Fetch Gallery
  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setGallery(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGallery(false);
    }
  };

  // Fetch Quotes
  const fetchQuotes = async () => {
    setLoadingQuotes(true);
    try {
      const res = await fetch("/api/quotes");
      const data = await res.json();
      if (data.success) {
        setQuotes(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuotes(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchInquiries();
      fetchGallery();
      fetchQuotes();
    }
  }, [show]);

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setAlertMsg({ type: "success", text: `Inquiry #${id} marked as "${status}"!` });
        fetchInquiries();
      }
    } catch (err) {
      setAlertMsg({ type: "danger", text: "Failed to update inquiry status." });
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm(`Are you sure you want to delete inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAlertMsg({ type: "success", text: `Inquiry #${id} deleted!` });
        fetchInquiries();
      }
    } catch (err) {
      setAlertMsg({ type: "danger", text: "Failed to delete inquiry." });
    }
  };

  // Save / Update Gallery Project
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      const isEdit = isEditingGallery && galleryForm.id;
      const url = isEdit ? `/api/gallery/${galleryForm.id}` : "/api/gallery";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm)
      });
      const data = await res.json();

      if (data.success) {
        setAlertMsg({
          type: "success",
          text: isEdit ? "Project photo updated in gallery!" : "New project photo added to gallery!"
        });
        resetGalleryForm();
        fetchGallery();
        if (onGalleryUpdated) onGalleryUpdated();
      } else {
        setAlertMsg({ type: "danger", text: data.error || "Operation failed." });
      }
    } catch (err) {
      setAlertMsg({ type: "danger", text: "Server error saving gallery project." });
    }
  };

  // Edit Gallery Project
  const handleEditGallery = (item) => {
    setGalleryForm({
      id: item.id,
      title: item.title,
      category: item.category,
      image_url: item.image_url,
      tech_stack: item.tech_stack,
      description: item.description,
      project_url: item.project_url || "#"
    });
    setIsEditingGallery(true);
  };

  // Delete Gallery Project
  const handleDeleteGallery = async (id) => {
    if (!window.confirm("Are you sure you want to remove this project from gallery?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAlertMsg({ type: "success", text: "Project deleted from gallery!" });
        fetchGallery();
        if (onGalleryUpdated) onGalleryUpdated();
      }
    } catch (err) {
      setAlertMsg({ type: "danger", text: "Failed to delete gallery item." });
    }
  };

  const resetGalleryForm = () => {
    setGalleryForm({
      id: null,
      title: "",
      category: "Web Development",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tech_stack: "React 18, Node.js, MySQL",
      description: "",
      project_url: "https://github.com"
    });
    setIsEditingGallery(false);
  };

  // Image Presets for Quick Selection
  const imagePresets = [
    { label: "FinTech Dashboard", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { label: "Mobile App UI", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" },
    { label: "E-Commerce", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
    { label: "Healthcare Web", url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" },
    { label: "AI Data System", url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80" },
    { label: "3D Cyber Visual", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" }
  ];

  const filteredInquiries =
    inquiriesFilter === "all"
      ? inquiries
      : inquiries.filter((inq) => (inq.status || "new") === inquiriesFilter);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered backdrop="static">
      <Modal.Header closeButton className="border-bottom bg-light">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary text-white p-2 d-flex align-items-center justify-content-center">
            <Database size={22} />
          </div>
          <div>
            <Modal.Title className="fw-bold fs-5">
              Krsh.Innovations — Agency Backend Admin Panel
            </Modal.Title>
            <div className="small text-muted">
              Live Database:{" "}
              <strong className={dbStatus?.isMySQL ? "text-success" : "text-primary"}>
                {dbStatus?.isMySQL ? "MySQL Active" : "Resilient Local Store Active"}
              </strong>{" "}
              • Official Email: Krsh.Innovations@gmail.com
            </div>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ minHeight: "65vh" }}>
        {alertMsg && (
          <Alert
            variant={alertMsg.type}
            dismissible
            onClose={() => setAlertMsg(null)}
            className="py-2 small"
          >
            {alertMsg.text}
          </Alert>
        )}

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          {/* Top Admin Navigation Tabs */}
          <Nav variant="pills" className="bg-light p-2 rounded-3 border mb-4 gap-2">
            <Nav.Item>
              <Nav.Link eventKey="inquiries" className="d-flex align-items-center gap-2 rounded-2 fw-semibold">
                <Mail size={16} />
                <span>Contact Form Details</span>
                <Badge bg="primary" className="rounded-pill">
                  {inquiries.length}
                </Badge>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="gallery" className="d-flex align-items-center gap-2 rounded-2 fw-semibold">
                <ImageIcon size={16} />
                <span>Gallery & Photos Management</span>
                <Badge bg="info" text="dark" className="rounded-pill">
                  {gallery.length}
                </Badge>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="quotes" className="d-flex align-items-center gap-2 rounded-2 fw-semibold">
                <DollarSign size={16} />
                <span>Project Quotes</span>
                <Badge bg="secondary" className="rounded-pill">
                  {quotes.length}
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* TAB 1: CONTACT FORM INQUIRIES */}
            <Tab.Pane eventKey="inquiries">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted fw-semibold">Filter Status:</span>
                  {["all", "new", "contacted", "in_progress", "completed"].map((st) => (
                    <button
                      key={st}
                      className={`btn btn-sm rounded-pill px-3 text-capitalize ${
                        inquiriesFilter === st ? "btn-dark shadow-sm" : "btn-outline-secondary"
                      }`}
                      onClick={() => setInquiriesFilter(st)}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={fetchInquiries}
                  disabled={loadingInquiries}
                  className="rounded-pill d-flex align-items-center gap-1"
                >
                  <RefreshCw size={14} className={loadingInquiries ? "spin" : ""} />
                  <span>Refresh</span>
                </Button>
              </div>

              {loadingInquiries ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <Mail size={42} className="mb-2 opacity-50" />
                  <p>No inquiries found for selected status.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle border">
                    <thead className="table-light small text-uppercase">
                      <tr>
                        <th>ID</th>
                        <th>Client Details</th>
                        <th>Service Requested</th>
                        <th>Budget</th>
                        <th>Message / Requirements</th>
                        <th>Status Action</th>
                        <th>Date</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id}>
                          <td>
                            <strong>#{inq.id}</strong>
                          </td>
                          <td>
                            <div className="fw-bold text-dark">{inq.name}</div>
                            <a href={`mailto:${inq.email}`} className="text-primary text-decoration-none">
                              {inq.email}
                            </a>
                            {inq.phone && <div className="text-muted small">{inq.phone}</div>}
                          </td>
                          <td>
                            <Badge bg="info-subtle" text="info-emphasis" className="border px-2 py-1">
                              {inq.service}
                            </Badge>
                          </td>
                          <td>
                            <span className="fw-semibold text-dark">{inq.budget || "Flexible"}</span>
                          </td>
                          <td style={{ maxWidth: "260px" }}>
                            <div
                              className="text-secondary small text-truncate"
                              title={inq.message}
                              style={{ cursor: "pointer" }}
                              onClick={() => alert(`Full Message from ${inq.name}:\n\n${inq.message}`)}
                            >
                              {inq.message}
                            </div>
                          </td>
                          <td>
                            <Form.Select
                              size="sm"
                              value={inq.status || "new"}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className={`rounded-pill fw-semibold ${
                                inq.status === "completed"
                                  ? "bg-success text-white"
                                  : inq.status === "contacted"
                                  ? "bg-info text-dark"
                                  : inq.status === "in_progress"
                                  ? "bg-warning text-dark"
                                  : "bg-danger text-white"
                              }`}
                              style={{ width: "135px" }}
                            >
                              <option value="new">🔴 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="in_progress">🟡 In Progress</option>
                              <option value="completed">🟢 Completed</option>
                            </Form.Select>
                          </td>
                          <td className="text-muted small">
                            {new Date(inq.created_at || Date.now()).toLocaleDateString()}
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-circle p-1"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              title="Delete Inquiry"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Tab.Pane>

            {/* TAB 2: GALLERY / PHOTOS MANAGEMENT */}
            <Tab.Pane eventKey="gallery">
              <Row className="g-4">
                {/* Add / Edit Form Column */}
                <Col lg={5}>
                  <Card className="border rounded-4 p-4 shadow-sm bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">
                        {isEditingGallery ? "✏️ Edit Gallery Project" : "➕ Add Gallery Project"}
                      </h5>
                      {isEditingGallery && (
                        <Button variant="link" size="sm" onClick={resetGalleryForm} className="text-muted p-0">
                          Cancel Edit
                        </Button>
                      )}
                    </div>

                    <Form onSubmit={handleSaveGallery}>
                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Project Title *</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="e.g. AI-Powered CRM Platform"
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Category *</Form.Label>
                        <Form.Select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          className="rounded-3"
                        >
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Enterprise">Enterprise</option>
                          <option value="AI & Python">AI & Python</option>
                          <option value="UI/UX & 3D">UI/UX & 3D</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Image Photo URL *</Form.Label>
                        <Form.Control
                          type="url"
                          required
                          placeholder="https://..."
                          value={galleryForm.image_url}
                          onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                          className="rounded-3 mb-2"
                        />

                        {/* Quick Presets */}
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {imagePresets.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              className="badge bg-white text-secondary border px-2 py-1 text-decoration-none"
                              style={{ cursor: "pointer" }}
                              onClick={() => setGalleryForm({ ...galleryForm, image_url: preset.url })}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>

                        {/* Image Preview Box */}
                        {galleryForm.image_url && (
                          <div
                            className="rounded-3 overflow-hidden border mb-2"
                            style={{ height: "130px", background: "#f8fafc" }}
                          >
                            <img
                              src={galleryForm.image_url}
                              alt="Preview"
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                              }}
                            />
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Technologies Used</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g. React 18, Flutter, Node.js, MySQL"
                          value={galleryForm.tech_stack}
                          onChange={(e) => setGalleryForm({ ...galleryForm, tech_stack: e.target.value })}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Short Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Key features delivered..."
                          value={galleryForm.description}
                          onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-secondary">Project / Demo Link</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="https://..."
                          value={galleryForm.project_url}
                          onChange={(e) => setGalleryForm({ ...galleryForm, project_url: e.target.value })}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-100 py-2 rounded-pill fw-bold border-0 shadow-sm"
                        style={{ background: "var(--krsh-gradient-blue)" }}
                      >
                        {isEditingGallery ? "Update Gallery Project" : "Add to Live Gallery"}
                      </Button>
                    </Form>
                  </Card>
                </Col>

                {/* Existing Gallery Projects List Column */}
                <Col lg={7}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-dark">Live Portfolio Photos ({gallery.length})</h5>
                    <Button variant="outline-primary" size="sm" onClick={fetchGallery} className="rounded-pill">
                      <RefreshCw size={13} />
                    </Button>
                  </div>

                  <div style={{ maxHeight: "550px", overflowY: "auto" }} className="pe-1">
                    <Row className="g-3">
                      {gallery.map((item) => (
                        <Col sm={6} key={item.id}>
                          <Card className="border rounded-3 overflow-hidden shadow-sm h-100">
                            <div style={{ height: "130px", overflow: "hidden", position: "relative" }}>
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                                onError={(e) => {
                                  e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                                }}
                              />
                              <Badge
                                bg="dark"
                                className="position-absolute top-0 end-0 m-2 bg-opacity-75 rounded-pill"
                              >
                                {item.category}
                              </Badge>
                            </div>

                            <Card.Body className="p-3 d-flex flex-column justify-content-between">
                              <div>
                                <h6 className="fw-bold text-dark mb-1 fs-6">{item.title}</h6>
                                <p className="small text-muted mb-2 line-clamp-2" style={{ fontSize: "12px" }}>
                                  {item.description}
                                </p>
                              </div>

                              <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                                <span className="small text-muted">#{item.id}</span>
                                <div className="d-flex gap-1">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="p-1 rounded-circle"
                                    onClick={() => handleEditGallery(item)}
                                    title="Edit Project"
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="p-1 rounded-circle"
                                    onClick={() => handleDeleteGallery(item.id)}
                                    title="Delete Project"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>
            </Tab.Pane>

            {/* TAB 3: PROJECT QUOTES */}
            <Tab.Pane eventKey="quotes">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0 text-dark">Estimator Quotes Received ({quotes.length})</h5>
                <Button variant="outline-primary" size="sm" onClick={fetchQuotes} className="rounded-pill">
                  <RefreshCw size={13} />
                </Button>
              </div>

              {quotes.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <DollarSign size={40} className="mb-2 opacity-50" />
                  <p>No quote calculations submitted yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle border">
                    <thead className="table-light small text-uppercase">
                      <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Project Type</th>
                        <th>Tech Stack</th>
                        <th>Features</th>
                        <th>Cost & Timeline</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {quotes.map((q) => (
                        <tr key={q.id}>
                          <td><strong>#{q.id}</strong></td>
                          <td>
                            <div className="fw-bold">{q.name}</div>
                            <a href={`mailto:${q.email}`} className="text-primary">{q.email}</a>
                          </td>
                          <td><Badge bg="primary-subtle" text="primary">{q.project_type}</Badge></td>
                          <td><span className="small text-secondary">{q.tech_stack}</span></td>
                          <td style={{ maxWidth: "200px" }}><span className="small text-secondary">{q.features}</span></td>
                          <td>
                            <div className="fw-bold text-success">{q.estimated_cost}</div>
                            <div className="small text-muted">{q.estimated_timeline}</div>
                          </td>
                          <td className="text-muted">{new Date(q.created_at || Date.now()).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>

      <Modal.Footer className="border-0 bg-light">
        <Button variant="secondary" onClick={onHide} className="rounded-pill px-4">
          Close Admin Panel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminPanelModal;
