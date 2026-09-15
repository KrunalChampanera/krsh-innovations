import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Form,
  Modal,
  Alert,
  Spinner
} from "react-bootstrap";
import {
  Layers,
  LayoutDashboard,
  Mail,
  Image as ImageIcon,
  DollarSign,
  RefreshCw,
  PlusCircle,
  Trash2,
  Edit,
  CheckCircle,
  Database,
  UploadCloud,
  Check
} from "lucide-react";

const AdminDashboard = ({ onBackToSite, dbStatus }) => {
  const [activeMenu, setActiveMenu] = useState("overview");

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiryFilter, setInquiryFilter] = useState("all");
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Gallery State
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    id: null,
    title: "",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tech_stack: "React 18, Node.js, MySQL",
    description: "",
    project_url: "https://github.com"
  });

  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAlert({ type: "danger", text: "Please select a valid image file (PNG, JPG, WEBP, etc.)" });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setAlert({ type: "danger", text: "Image file is too large. Maximum size is 15MB." });
      return;
    }

    setUploadingImage(true);
    setUploadSuccess(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64Data,
            filename: file.name
          })
        });

        const data = await res.json();
        if (data.success && data.url) {
          setGalleryForm((prev) => ({
            ...prev,
            image_url: data.url
          }));
          setUploadSuccess(file.name);
          setAlert({ type: "success", text: `Image "${file.name}" uploaded successfully to server!` });
        } else {
          setGalleryForm((prev) => ({
            ...prev,
            image_url: base64Data
          }));
          setUploadSuccess(file.name);
        }
      } catch (err) {
        console.error("Upload error:", err);
        setGalleryForm((prev) => ({
          ...prev,
          image_url: reader.result
        }));
        setUploadSuccess(file.name);
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Quotes State
  const [quotes, setQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  // Feedback Alert
  const [alert, setAlert] = useState(null);

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
    fetchInquiries();
    fetchGallery();
    fetchQuotes();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: "success", text: `Inquiry #${id} marked as "${status}"!` });
        fetchInquiries();
      }
    } catch (err) {
      setAlert({ type: "danger", text: "Failed to update status." });
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm(`Delete inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: "success", text: `Inquiry #${id} removed!` });
        fetchInquiries();
      }
    } catch (err) {
      setAlert({ type: "danger", text: "Failed to delete inquiry." });
    }
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (uploadingImage) {
      setAlert({ type: "warning", text: "Please wait, image is still uploading to server..." });
      return;
    }
    if (!galleryForm.title || !galleryForm.category || !galleryForm.image_url) {
      setAlert({ type: "danger", text: "Please provide Project Title, Category, and Image." });
      return;
    }
    try {
      const isEdit = galleryForm.id !== null;
      const url = isEdit ? `/api/gallery/${galleryForm.id}` : "/api/gallery";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm)
      });

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        throw new Error(`Server returned status ${res.status}: ${res.statusText}`);
      }

      if (data && data.success) {
        setAlert({
          type: "success",
          text: isEdit ? "Gallery project photo updated!" : "New project photo added to live gallery!"
        });
        setShowGalleryModal(false);
        resetGalleryForm();
        setUploadSuccess(null);
        fetchGallery();
      } else {
        setAlert({ type: "danger", text: (data && data.error) ? data.error : "Save failed. Please check input values." });
      }
    } catch (err) {
      console.error("Error saving gallery:", err);
      setAlert({ type: "danger", text: `Error saving project: ${err.message}` });
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm("Remove this project photo from gallery?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: "success", text: "Gallery photo deleted!" });
        fetchGallery();
      }
    } catch (err) {
      setAlert({ type: "danger", text: "Failed to delete gallery item." });
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
  };

  const openEditModal = (item) => {
    setGalleryForm({
      id: item.id,
      title: item.title,
      category: item.category,
      image_url: item.image_url,
      tech_stack: item.tech_stack,
      description: item.description,
      project_url: item.project_url || "#"
    });
    setShowGalleryModal(true);
  };

  const imagePresets = [
    { label: "FinTech App", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { label: "Mobile App", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" },
    { label: "E-Commerce", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
    { label: "Healthcare", url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" },
    { label: "AI Dashboard", url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80" },
    { label: "3D Visual", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" }
  ];

  const newInquiriesCount = inquiries.filter((i) => (i.status || "new") === "new").length;

  const filteredInquiries =
    inquiryFilter === "all"
      ? inquiries
      : inquiries.filter((i) => (i.status || "new") === inquiryFilter);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* 1. Left Sidebar Navigation */}
      <div
        className="d-flex flex-column justify-content-between p-3 text-white"
        style={{
          width: "270px",
          minWidth: "270px",
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)"
        }}
      >
        <div>
          <div className="pb-3 mb-4 border-bottom border-secondary border-opacity-25">
            <div className="bg-white px-3 py-2 rounded-3 shadow-sm mb-2 d-flex align-items-center justify-content-center">
              <img
                src="/logo-horizontal.png"
                alt="Krsh Innovations"
                style={{
                  height: "36px",
                  width: "auto",
                  maxWidth: "180px",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </div>
            <div className="small text-info fw-semibold text-center" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
              SUPER ADMIN PANEL
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <button
              onClick={() => setActiveMenu("overview")}
              className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 fw-semibold border-0 ${
                activeMenu === "overview"
                  ? "bg-primary text-white shadow"
                  : "text-secondary hover-white"
              }`}
              style={activeMenu === "overview" ? { background: "#00a2ea" } : {}}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveMenu("inquiries")}
              className={`btn text-start d-flex align-items-center justify-content-between px-3 py-2 rounded-3 fw-semibold border-0 ${
                activeMenu === "inquiries"
                  ? "bg-primary text-white shadow"
                  : "text-secondary hover-white"
              }`}
              style={activeMenu === "inquiries" ? { background: "#00a2ea" } : {}}
            >
              <div className="d-flex align-items-center gap-3">
                <Mail size={18} />
                <span>Contact Inquiries</span>
              </div>
              {newInquiriesCount > 0 && (
                <Badge bg="danger" pill style={{ fontSize: "11px" }}>
                  {newInquiriesCount}
                </Badge>
              )}
            </button>

            <button
              onClick={() => setActiveMenu("gallery")}
              className={`btn text-start d-flex align-items-center justify-content-between px-3 py-2 rounded-3 fw-semibold border-0 ${
                activeMenu === "gallery"
                  ? "bg-primary text-white shadow"
                  : "text-secondary hover-white"
              }`}
              style={activeMenu === "gallery" ? { background: "#00a2ea" } : {}}
            >
              <div className="d-flex align-items-center gap-3">
                <ImageIcon size={18} />
                <span>Gallery & Photos</span>
              </div>
              <Badge bg="secondary" pill style={{ fontSize: "11px" }}>
                {gallery.length}
              </Badge>
            </button>

            <button
              onClick={() => setActiveMenu("quotes")}
              className={`btn text-start d-flex align-items-center justify-content-between px-3 py-2 rounded-3 fw-semibold border-0 ${
                activeMenu === "quotes"
                  ? "bg-primary text-white shadow"
                  : "text-secondary hover-white"
              }`}
              style={activeMenu === "quotes" ? { background: "#00a2ea" } : {}}
            >
              <div className="d-flex align-items-center gap-3">
                <DollarSign size={18} />
                <span>Project Quotes</span>
              </div>
              <Badge bg="secondary" pill style={{ fontSize: "11px" }}>
                {quotes.length}
              </Badge>
            </button>
          </div>
        </div>

        {/* Back to Live Website */}
        <div className="pt-3 border-top border-secondary">
          <div className="p-3 bg-secondary bg-opacity-25 rounded-3 mb-3">
            <div className="d-flex align-items-center gap-2 small text-white-50 mb-1">
              <Database size={14} className={dbStatus?.isMySQL ? "text-success" : "text-primary"} />
              <span>Database Engine:</span>
            </div>
            <div className="fw-bold small text-white">
              {dbStatus?.isMySQL ? "MySQL 8.0 (Live)" : "Local Resilient Store"}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        <div
          className="bg-white px-4 py-3 d-flex justify-content-between align-items-center border-bottom sticky-top"
          style={{ zIndex: 10 }}
        >
          <div>
            <h4 className="fw-bold mb-0 text-dark">
              {activeMenu === "overview" && "Executive Dashboard Overview"}
              {activeMenu === "inquiries" && "Customer Contact Inquiries"}
              {activeMenu === "gallery" && "Portfolio Gallery Photos Management"}
              {activeMenu === "quotes" && "Client Project Cost Estimates"}
            </h4>
            <div className="small text-muted">Krsh.Innovations • Enterprise Studio Management</div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-md-flex align-items-center gap-2 bg-light px-3 py-1 rounded-pill border">
              <span className={`rounded-circle ${dbStatus?.isMySQL ? "bg-success" : "bg-primary"}`} style={{ width: "8px", height: "8px" }}></span>
              <span className="small fw-semibold text-secondary">
                {dbStatus?.isMySQL ? "MySQL Connected" : "Local Store Active"}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: "36px", height: "36px", background: "#00a2ea" }}
              >
                KI
              </div>
              <div className="d-none d-sm-block">
                <div className="fw-bold small text-dark">Super Admin</div>
                <div className="text-muted" style={{ fontSize: "11px" }}>Krsh.Innovations@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex-grow-1">
          {alert && (
            <Alert variant={alert.type} dismissible onClose={() => setAlert(null)} className="py-2 small">
              {alert.text}
            </Alert>
          )}

          {/* OVERVIEW VIEW */}
          {activeMenu === "overview" && (
            <div>
              <Row className="g-4 mb-4">
                <Col sm={6} lg={3}>
                  <Card className="border-0 rounded-4 shadow-sm p-3 bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="small text-muted fw-semibold text-uppercase">Total Inquiries</span>
                      <div className="rounded-circle bg-primary-subtle text-primary p-2">
                        <Mail size={18} />
                      </div>
                    </div>
                    <div className="display-6 fw-bold text-dark">{inquiries.length}</div>
                    <div className="small text-danger fw-semibold mt-1">{newInquiriesCount} Pending Review</div>
                  </Card>
                </Col>

                <Col sm={6} lg={3}>
                  <Card className="border-0 rounded-4 shadow-sm p-3 bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="small text-muted fw-semibold text-uppercase">Gallery Photos</span>
                      <div className="rounded-circle bg-info-subtle text-info p-2">
                        <ImageIcon size={18} />
                      </div>
                    </div>
                    <div className="display-6 fw-bold text-dark">{gallery.length}</div>
                    <div className="small text-success fw-semibold mt-1">Live in Portfolio</div>
                  </Card>
                </Col>

                <Col sm={6} lg={3}>
                  <Card className="border-0 rounded-4 shadow-sm p-3 bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="small text-muted fw-semibold text-uppercase">Estimates Submitted</span>
                      <div className="rounded-circle bg-success-subtle text-success p-2">
                        <DollarSign size={18} />
                      </div>
                    </div>
                    <div className="display-6 fw-bold text-dark">{quotes.length}</div>
                    <div className="small text-muted mt-1">Calculated Online</div>
                  </Card>
                </Col>

                <Col sm={6} lg={3}>
                  <Card className="border-0 rounded-4 shadow-sm p-3 bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="small text-muted fw-semibold text-uppercase">Delivery SLA</span>
                      <div className="rounded-circle bg-warning-subtle text-warning p-2">
                        <CheckCircle size={18} />
                      </div>
                    </div>
                    <div className="display-6 fw-bold text-dark">98.5%</div>
                    <div className="small text-success fw-semibold mt-1">On-Time Completion</div>
                  </Card>
                </Col>
              </Row>

              <Card className="border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0 text-dark">Recent Incoming Inquiries</h5>
                  <Button
                    variant="link"
                    className="small text-primary p-0 fw-semibold text-decoration-none"
                    onClick={() => setActiveMenu("inquiries")}
                  >
                    View All Inquiries &rarr;
                  </Button>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-4 text-muted small">No contact inquiries yet.</div>
                ) : (
                  <div className="table-responsive">
                    <Table hover className="align-middle mb-0" style={{ minWidth: "750px" }}>
                      <thead className="table-light small text-uppercase">
                        <tr>
                          <th className="align-middle text-center" style={{ width: "60px" }}>ID</th>
                          <th className="align-middle">Client Name</th>
                          <th className="align-middle">Email</th>
                          <th className="align-middle">Service</th>
                          <th className="align-middle text-nowrap">Budget</th>
                          <th className="align-middle text-center">Status</th>
                          <th className="align-middle text-nowrap">Date</th>
                        </tr>
                      </thead>
                      <tbody className="small">
                        {inquiries.slice(0, 5).map((inq) => (
                          <tr key={inq.id}>
                            <td className="align-middle text-center"><strong className="text-secondary">#{inq.id}</strong></td>
                            <td className="align-middle fw-bold text-dark">{inq.name}</td>
                            <td className="align-middle"><a href={`mailto:${inq.email}`} className="text-primary text-decoration-none">{inq.email}</a></td>
                            <td className="align-middle"><Badge bg="light" text="dark" className="border px-2 py-1">{inq.service}</Badge></td>
                            <td className="align-middle text-nowrap fw-bold text-dark">{inq.budget || "Flexible"}</td>
                            <td className="align-middle text-center">
                              <Badge
                                bg={
                                  inq.status === "completed"
                                    ? "success"
                                    : inq.status === "contacted"
                                    ? "info"
                                    : inq.status === "in_progress"
                                    ? "warning"
                                    : "danger"
                                }
                                className="rounded-pill px-3 py-1 text-capitalize"
                              >
                                {inq.status || "new"}
                              </Badge>
                            </td>
                            <td className="align-middle text-muted text-nowrap">{new Date(inq.created_at || Date.now()).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* INQUIRIES VIEW */}
          {activeMenu === "inquiries" && (
            <Card className="border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 pb-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted fw-semibold">Filter:</span>
                  {["all", "new", "contacted", "in_progress", "completed"].map((st) => (
                    <button
                      key={st}
                      className={`btn btn-sm rounded-pill px-3 text-capitalize ${
                        inquiryFilter === st ? "btn-dark shadow-sm" : "btn-outline-secondary"
                      }`}
                      onClick={() => setInquiryFilter(st)}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <Button variant="outline-primary" size="sm" onClick={fetchInquiries} className="rounded-pill">
                  <RefreshCw size={14} className={loadingInquiries ? "spin" : ""} />
                </Button>
              </div>

              {loadingInquiries ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
              ) : filteredInquiries.length === 0 ? (
                <div className="text-center py-5 text-muted">No inquiries found matching filter.</div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0" style={{ minWidth: "960px" }}>
                    <thead className="table-light small text-uppercase">
                      <tr>
                        <th className="align-middle text-center" style={{ width: "60px" }}>ID</th>
                        <th className="align-middle" style={{ minWidth: "200px" }}>Client Details</th>
                        <th className="align-middle" style={{ minWidth: "150px" }}>Service</th>
                        <th className="align-middle text-nowrap" style={{ minWidth: "140px" }}>Budget</th>
                        <th className="align-middle" style={{ minWidth: "220px" }}>Message / Scope</th>
                        <th className="align-middle text-center" style={{ minWidth: "150px" }}>Status Control</th>
                        <th className="align-middle text-nowrap" style={{ minWidth: "110px" }}>Date</th>
                        <th className="align-middle text-center" style={{ width: "70px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id}>
                          <td className="align-middle text-center"><strong className="text-secondary">#{inq.id}</strong></td>
                          <td className="align-middle">
                            <div className="fw-bold text-dark">{inq.name}</div>
                            <a href={`mailto:${inq.email}`} className="text-primary text-decoration-none small d-block">{inq.email}</a>
                            {inq.phone && <div className="text-muted small">{inq.phone}</div>}
                          </td>
                          <td className="align-middle"><Badge bg="info-subtle" text="info-emphasis" className="border px-2 py-1">{inq.service}</Badge></td>
                          <td className="align-middle text-nowrap fw-bold text-dark">{inq.budget || "Flexible"}</td>
                          <td className="align-middle" style={{ maxWidth: "260px" }}>
                            <div className="text-secondary small text-truncate" title={inq.message}>
                              {inq.message || "—"}
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <Form.Select
                              size="sm"
                              value={inq.status || "new"}
                              onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                              className={`rounded-pill fw-semibold mx-auto ${
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
                          <td className="align-middle text-muted text-nowrap">{new Date(inq.created_at || Date.now()).toLocaleDateString()}</td>
                          <td className="align-middle text-center">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-circle p-1"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              title="Delete"
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
            </Card>
          )}

          {/* GALLERY VIEW */}
          {activeMenu === "gallery" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-bold mb-1 text-dark">Live Portfolio Projects ({gallery.length})</h5>
                  <div className="small text-muted">Update gallery photos and projects in MySQL database</div>
                </div>
                <Button
                  variant="primary"
                  className="rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold shadow-sm border-0"
                  style={{ background: "#00a2ea" }}
                  onClick={() => {
                    resetGalleryForm();
                    setShowGalleryModal(true);
                  }}
                >
                  <PlusCircle size={18} />
                  <span>Add Project Photo</span>
                </Button>
              </div>

              <Row className="g-4">
                {gallery.map((item) => (
                  <Col md={6} lg={4} key={item.id}>
                    <Card className="border-0 rounded-4 overflow-hidden shadow-sm h-100 bg-white">
                      <div style={{ height: "180px", position: "relative", overflow: "hidden" }}>
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <Badge bg="dark" className="position-absolute top-0 end-0 m-3 bg-opacity-75 rounded-pill">
                          {item.category}
                        </Badge>
                      </div>

                      <Card.Body className="p-3 d-flex flex-column justify-content-between">
                        <div>
                          <h6 className="fw-bold text-dark mb-1">{item.title}</h6>
                          <div className="small text-primary fw-semibold mb-2">{item.tech_stack}</div>
                          <p className="small text-muted mb-3" style={{ fontSize: "12px" }}>
                            {item.description}
                          </p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                          <span className="small text-muted">Project #{item.id}</span>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="rounded-pill px-3 py-1 d-flex align-items-center gap-1"
                              onClick={() => openEditModal(item)}
                            >
                              <Edit size={13} />
                              <span>Edit</span>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-circle p-1"
                              onClick={() => handleDeleteGallery(item.id)}
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
          )}

          {/* QUOTES VIEW */}
          {activeMenu === "quotes" && (
            <Card className="border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0 text-dark">Estimator Quotes ({quotes.length})</h5>
                <Button variant="outline-primary" size="sm" onClick={fetchQuotes} className="rounded-pill">
                  <RefreshCw size={14} />
                </Button>
              </div>

              {quotes.length === 0 ? (
                <div className="text-center py-5 text-muted">No quote requests yet.</div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0" style={{ minWidth: "880px" }}>
                    <thead className="table-light small text-uppercase">
                      <tr>
                        <th className="align-middle text-center" style={{ width: "60px" }}>ID</th>
                        <th className="align-middle" style={{ minWidth: "180px" }}>Client</th>
                        <th className="align-middle" style={{ minWidth: "160px" }}>Project Type</th>
                        <th className="align-middle" style={{ minWidth: "160px" }}>Tech Stack</th>
                        <th className="align-middle" style={{ minWidth: "160px" }}>Features</th>
                        <th className="align-middle text-nowrap" style={{ minWidth: "140px" }}>Estimate</th>
                        <th className="align-middle text-nowrap" style={{ minWidth: "110px" }}>Date</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {quotes.map((q) => (
                        <tr key={q.id}>
                          <td className="align-middle text-center"><strong className="text-secondary">#{q.id}</strong></td>
                          <td className="align-middle">
                            <div className="fw-bold text-dark">{q.name}</div>
                            <a href={`mailto:${q.email}`} className="text-primary text-decoration-none small">{q.email}</a>
                          </td>
                          <td className="align-middle"><Badge bg="primary-subtle" text="primary" className="border px-2 py-1">{q.project_type}</Badge></td>
                          <td className="align-middle"><span className="small text-secondary">{q.tech_stack}</span></td>
                          <td className="align-middle"><span className="small text-secondary">{q.features}</span></td>
                          <td className="align-middle text-nowrap">
                            <div className="fw-bold text-success">{q.estimated_cost}</div>
                            <div className="small text-muted">{q.estimated_timeline}</div>
                          </td>
                          <td className="align-middle text-muted text-nowrap">{new Date(q.created_at || Date.now()).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* Gallery Modal */}
      <Modal show={showGalleryModal} onHide={() => setShowGalleryModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-5">
            {galleryForm.id ? "✏️ Edit Project Photo" : "➕ Add Project Photo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSaveGallery}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Project Title *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="AI-Powered CRM Platform"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Category *</Form.Label>
                  <Form.Select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="AI & Python">AI & Python</option>
                    <option value="UI/UX & 3D">UI/UX & 3D</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label className="small fw-bold mb-0">Project Photo / Image *</Form.Label>
                    {uploadSuccess && (
                      <span className="badge bg-success text-white small d-inline-flex align-items-center gap-1">
                        <Check size={12} /> {uploadSuccess}
                      </span>
                    )}
                  </div>

                  {/* 1. Drag & Drop / Click to Upload Image File */}
                  <div
                    className="admin-upload-dropzone mb-3"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                    <div className="d-flex flex-column align-items-center gap-2">
                      <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
                        <UploadCloud size={28} />
                      </div>
                      <div>
                        <div className="fw-bold text-primary">Click to Browse or Drag & Drop Image File</div>
                        <div className="small text-muted">Supports PNG, JPG, WEBP, SVG (Uploads directly to server)</div>
                      </div>
                      {uploadingImage && (
                        <div className="d-flex align-items-center gap-2 text-primary small mt-1">
                          <Spinner animation="border" size="sm" />
                          <span>Uploading image to server...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live Image Preview */}
                  {galleryForm.image_url && (
                    <div className="mb-3 p-2 bg-light border rounded-3 text-center">
                      <div className="small text-muted mb-1 fw-semibold">Live Image Preview:</div>
                      <img
                        src={galleryForm.image_url}
                        alt="Project Preview"
                        className="rounded-3 shadow-sm"
                        style={{ maxHeight: "170px", maxWidth: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="small text-muted mt-1 font-monospace" style={{ fontSize: "11px" }}>
                        {galleryForm.image_url}
                      </div>
                    </div>
                  )}

                  {/* 2. Direct Image URL / Presets alternative */}
                  <div className="small text-muted fw-semibold mb-1">Or enter direct Image URL / Presets:</div>
                  <Form.Control
                    type="text"
                    required
                    placeholder="https://... or /uploads/..."
                    value={galleryForm.image_url}
                    onChange={(e) => {
                      setGalleryForm({ ...galleryForm, image_url: e.target.value });
                      setUploadSuccess(null);
                    }}
                  />
                  <div className="d-flex flex-wrap gap-1 mt-2">
                    <span className="small text-muted me-2">Quick Presets:</span>
                    {imagePresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="badge bg-light text-dark border px-2 py-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setGalleryForm({ ...galleryForm, image_url: preset.url });
                          setUploadSuccess(null);
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Technologies</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="React 18, Flutter, MySQL"
                    value={galleryForm.tech_stack}
                    onChange={(e) => setGalleryForm({ ...galleryForm, tech_stack: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Demo Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://..."
                    value={galleryForm.project_url}
                    onChange={(e) => setGalleryForm({ ...galleryForm, project_url: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Key capabilities delivered..."
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-2 rounded-pill fw-bold border-0 shadow-sm"
                  style={{ background: "#00a2ea" }}
                >
                  {galleryForm.id ? "Update Project in MySQL" : "Save to Live Gallery (MySQL)"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
