/* ==========================================================================
   HR1VIETNAM CERTIFICATE HUB - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. INITIAL DATASET (606 HUTECH STUDENTS PRE-LOADED)
    // ----------------------------------------------------------------------
    let studentDatabase = window.INITIAL_STUDENTS_DATABASE || [];
    let isAdminAuthenticated = false;

    let currentSelectedStudent = null;
    let qrCodeInstance = null;

    // ----------------------------------------------------------------------
    // 2. DOM ELEMENTS
    // ----------------------------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-link, .nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const themeToggleBtn = document.getElementById('theme-toggle');

    const inputMssv = document.getElementById('input-mssv');
    const btnSearch = document.getElementById('btn-search');
    const searchResultArea = document.getElementById('search-result-area');
    const statusAlertSuccess = document.getElementById('status-alert');
    const statusAlertError = document.getElementById('status-alert-error');
    const studentDetailContainer = document.getElementById('student-detail-container');

    const resName = document.getElementById('res-name');
    const resMssv = document.getElementById('res-mssv');
    const resClass = document.getElementById('res-class');
    const resFaculty = document.getElementById('res-faculty');
    const resTopic = document.getElementById('res-topic');
    const resDate = document.getElementById('res-date');
    const resCertId = document.getElementById('res-cert-id');

    const certStudentName = document.getElementById('cert-student-name');
    const certStudentMssv = document.getElementById('cert-student-mssv');
    const certStudentClass = document.getElementById('cert-student-class');
    const certStudentFaculty = document.getElementById('cert-student-faculty');
    const certTopicTitle = document.getElementById('cert-topic-title');
    const certTourDate = document.getElementById('cert-tour-date');
    const certStudentDateMeta = document.getElementById('cert-student-date-meta');
    const certQrId = document.getElementById('cert-qr-id');
    const certQrCodeContainer = document.getElementById('cert-qr-code');

    const btnDownloadPdf = document.getElementById('btn-download-pdf');
    const btnDownloadPng = document.getElementById('btn-download-png');
    const btnShareLinkedin = document.getElementById('btn-share-linkedin');

    const inputVerifyCode = document.getElementById('input-verify-code');
    const btnVerifyNow = document.getElementById('btn-verify-now');
    const verifyResultBox = document.getElementById('verify-result-box');

    // Admin PIN Auth Elements
    const adminAuthBox = document.getElementById('admin-auth-box');
    const adminContentBox = document.getElementById('admin-content-box');
    const inputAdminPin = document.getElementById('input-admin-pin');
    const btnAuthAdmin = document.getElementById('btn-auth-admin');
    const adminPinError = document.getElementById('admin-pin-error');

    const dropZone = document.getElementById('drop-zone');
    const fileUploadInput = document.getElementById('file-upload');
    const tableStudentsBody = document.getElementById('table-students-body');
    const statTotalStudents = document.getElementById('stat-total-students');
    const btnDownloadSampleCsv = document.getElementById('btn-download-sample-csv');
    const btnToggleAddModal = document.getElementById('btn-toggle-add-modal');
    const modalAddStudent = document.getElementById('modal-add-student');
    const formAddStudent = document.getElementById('form-add-student');
    const btnExportDatabase = document.getElementById('btn-export-database');
    const btnClearDatabase = document.getElementById('btn-clear-database');

    const modalLinkedin = document.getElementById('modal-linkedin');
    const linkedinText = document.getElementById('linkedin-text');
    const btnCopyLinkedin = document.getElementById('btn-copy-linkedin');

    // ----------------------------------------------------------------------
    // 3. TAB NAVIGATION & ADMIN SECURITY PIN
    // ----------------------------------------------------------------------
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            navButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.add('hidden'));

            btn.classList.add('active');
            const targetEl = document.getElementById(target);
            if (targetEl) {
                targetEl.classList.remove('hidden');
            }

            if (target === 'tab-admin') {
                if (isAdminAuthenticated) {
                    if (adminAuthBox) adminAuthBox.classList.add('hidden');
                    if (adminContentBox) adminContentBox.classList.remove('hidden');
                    renderAdminTable();
                } else {
                    if (adminAuthBox) adminAuthBox.classList.remove('hidden');
                    if (adminContentBox) adminContentBox.classList.add('hidden');
                }
            }
        });
    });

    // Admin PIN Validation
    function authenticateAdmin() {
        if (!inputAdminPin) return;
        const pin = inputAdminPin.value.trim();
        if (pin === 'Hr1@1123') {
            isAdminAuthenticated = true;
            if (adminPinError) adminPinError.classList.add('hidden');
            if (adminAuthBox) adminAuthBox.classList.add('hidden');
            if (adminContentBox) adminContentBox.classList.remove('hidden');
            renderAdminTable();
        } else {
            if (adminPinError) adminPinError.classList.remove('hidden');
        }
    }

    if (btnAuthAdmin) {
        btnAuthAdmin.addEventListener('click', authenticateAdmin);
    }
    if (inputAdminPin) {
        inputAdminPin.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') authenticateAdmin();
        });
    }

    const btnBrandHome = document.getElementById('btn-brand-home');
    if (btnBrandHome) {
        btnBrandHome.addEventListener('click', () => {
            if (navButtons && navButtons.length > 0) {
                navButtons[0].click();
            }
        });
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-light');
            const isLight = document.body.classList.contains('theme-light');
            themeToggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // ----------------------------------------------------------------------
    // 4. STUDENT SEARCH & CERTIFICATE GENERATION LOGIC
    // ----------------------------------------------------------------------
    function performSearch(query) {
        const cleaned = query.trim().toLowerCase();
        if (!cleaned) return;

        const found = studentDatabase.find(s => 
            s.mssv.toLowerCase() === cleaned || 
            s.certId.toLowerCase() === cleaned
        );

        searchResultArea.classList.remove('hidden');

        if (found) {
            currentSelectedStudent = found;
            statusAlertError.classList.add('hidden');
            statusAlertSuccess.classList.remove('hidden');
            studentDetailContainer.classList.remove('hidden');

            resName.textContent = found.name;
            resMssv.textContent = found.mssv;
            resClass.textContent = found.class;
            resFaculty.textContent = found.faculty;
            resTopic.textContent = found.topic;
            resDate.textContent = formatDate(found.date);
            resCertId.textContent = found.certId;

            certStudentName.textContent = found.name;
            certStudentMssv.textContent = found.mssv;
            certStudentClass.textContent = found.class;
            certStudentFaculty.textContent = found.faculty;
            certTopicTitle.textContent = `"${found.topic}"`;
            certTourDate.textContent = formatDate(found.date);
            if (certStudentDateMeta) certStudentDateMeta.textContent = formatDate(found.date);
            certQrId.textContent = found.certId;

            generateQrCode(found.certId);
            searchResultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            currentSelectedStudent = null;
            statusAlertSuccess.classList.add('hidden');
            studentDetailContainer.classList.add('hidden');
            statusAlertError.classList.remove('hidden');
        }
    }

    if (btnSearch) {
        btnSearch.addEventListener('click', () => performSearch(inputMssv ? inputMssv.value : ''));
    }
    if (inputMssv) {
        inputMssv.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(inputMssv.value); });
    }

    function generateQrCode(certId) {
        if (!certQrCodeContainer) return;
        certQrCodeContainer.innerHTML = '';
        const verifyUrl = `${window.location.origin}${window.location.pathname}?verify=${certId}`;
        
        qrCodeInstance = new QRCode(certQrCodeContainer, {
            text: verifyUrl,
            width: 56,
            height: 56,
            colorDark: "#101828",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        let str = dateStr.toString().trim();
        
        // 1. Ưu tiên quét định dạng Việt Nam DD/MM/YYYY trước (VD: 08:30 - 13/03/2026 hoặc 12:0009/03/2026)
        const dateMatch = str.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
        if (dateMatch) {
            const day = dateMatch[1].padStart(2, '0');
            const month = dateMatch[2].padStart(2, '0');
            const year = dateMatch[3];
            return `${day}/${month}/${year}`;
        }
        
        // 2. Quét định dạng ISO YYYY-MM-DD sau (VD: 2026-03-13 08:30)
        const isoMatch = str.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
        if (isoMatch) {
            const year = isoMatch[1];
            const month = isoMatch[2].padStart(2, '0');
            const day = isoMatch[3].padStart(2, '0');
            return `${day}/${month}/${year}`;
        }
        
        return str;
    }

    // ----------------------------------------------------------------------
    // 5. PDF & PNG DOWNLOAD LOGIC
    // ----------------------------------------------------------------------
    if (btnDownloadPng) {
        btnDownloadPng.addEventListener('click', async () => {
            if (!currentSelectedStudent) return;
            btnDownloadPng.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang Tạo Ảnh...';
            btnDownloadPng.disabled = true;

            try {
                const certElement = document.getElementById('certificate-template');
                const canvas = await html2canvas(certElement, {
                    scale: 2.5,
                    useCORS: true,
                    backgroundColor: '#fffdf8'
                });

                const link = document.createElement('a');
                link.download = `Certificate_HR1Vietnam_${currentSelectedStudent.mssv}_${currentSelectedStudent.name.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (err) {
                alert('Có lỗi khi xuất file ảnh: ' + err.message);
            } finally {
                btnDownloadPng.innerHTML = '<i class="fa-solid fa-image"></i> Tải Ảnh PNG (Nét Cao)';
                btnDownloadPng.disabled = false;
            }
        });
    }

    if (btnDownloadPdf) {
        btnDownloadPdf.addEventListener('click', async () => {
            if (!currentSelectedStudent) return;
            btnDownloadPdf.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang Tạo PDF...';
            btnDownloadPdf.disabled = true;

            try {
                const certElement = document.getElementById('certificate-template');
                const canvas = await html2canvas(certElement, {
                    scale: 2.5,
                    useCORS: true,
                    backgroundColor: '#fffdf8'
                });

                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`Certificate_HR1Vietnam_${currentSelectedStudent.mssv}.pdf`);
            } catch (err) {
                alert('Có lỗi khi tạo file PDF: ' + err.message);
            } finally {
                btnDownloadPdf.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Tải PDF (Đính CV / Hồ sơ)';
                btnDownloadPdf.disabled = false;
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. LINKEDIN SHARE LOGIC
    // ----------------------------------------------------------------------
    if (btnShareLinkedin) {
        btnShareLinkedin.addEventListener('click', () => {
            if (!currentSelectedStudent) return;
            const copyText = `🎓 RẤT TỰ HÀO KHI HOÀN THÀNH COMPANY TOUR TẠI HR1VIETNAM! 🎓\n\nVừa qua, mình đã có cơ hội tuyệt vời tham gia chương trình tham quan và học tập chuyên đề Nhân sự tại doanh nghiệp HR1Vietnam.\n\n✨ Bài học tâm đắc nhất:\n- Quy trình tuyển dụng nhân sự thực chiến\n- Kỹ năng xây dựng hồ sơ ấn tượng và định hướng nghề nghiệp HR\n\nCảm ơn Quý Công ty HR1Vietnam và Ban Giảng viên Khoa ${currentSelectedStudent.faculty} - Trường Đại học HUTECH đã tạo điều kiện cho chúng mình có chuyến trải nghiệm thực tế đầy giá trị! 🚀\n\n#HR1Vietnam #HUTECH #CompanyTour #HRCareer #CertificateOfCompletion #HR1Academy`;

            if (linkedinText) linkedinText.value = copyText;
            if (modalLinkedin) modalLinkedin.classList.remove('hidden');
        });
    }

    if (btnCopyLinkedin) {
        btnCopyLinkedin.addEventListener('click', () => {
            if (linkedinText) {
                linkedinText.select();
                document.execCommand('copy');
            }
            btnCopyLinkedin.innerHTML = '<i class="fa-solid fa-check"></i> Đã Sao Chép!';
            setTimeout(() => { btnCopyLinkedin.innerHTML = '<i class="fa-solid fa-copy"></i> Sao Chép Nội Dung'; }, 2000);
        });
    }

    // ----------------------------------------------------------------------
    // 7. VERIFICATION TAB LOGIC
    // ----------------------------------------------------------------------
    function verifyCertCode(code) {
        const cleaned = code.trim().toUpperCase();
        if (!cleaned) return;

        const found = studentDatabase.find(s => s.certId.toUpperCase() === cleaned || s.mssv === cleaned);
        verifyResultBox.classList.remove('hidden');

        if (found) {
            verifyResultBox.className = 'verify-result alert-success';
            verifyResultBox.innerHTML = `
                <div style="display: flex; gap: 16px; align-items: center;">
                    <i class="fa-solid fa-circle-check" style="font-size: 36px;"></i>
                    <div>
                        <h4 style="font-size: 18px; color: #10b981; margin-bottom: 4px;">CHỨNG NHẬN HỢP LỆ (VERIFIED OFFICIAL)</h4>
                        <p style="margin-bottom: 8px;">Chứng nhận này được xác nhận chính thức cấp bởi <strong>HR1Vietnam</strong> hợp tác cùng <strong>Đại học HUTECH</strong>.</p>
                        <ul style="font-size: 13px; line-height: 1.8; list-style: none;">
                            <li>• <strong>Họ tên sinh viên:</strong> ${found.name}</li>
                            <li>• <strong>Mã số sinh viên (MSSV):</strong> ${found.mssv}</li>
                            <li>• <strong>Lớp & Khoa:</strong> ${found.class} - ${found.faculty}</li>
                            <li>• <strong>Ngày tham gia Tour:</strong> ${formatDate(found.date)}</li>
                            <li>• <strong>Mã xác thực Certificate:</strong> <code>${found.certId}</code></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            verifyResultBox.className = 'verify-result alert-danger';
            verifyResultBox.innerHTML = `
                <div style="display: flex; gap: 16px; align-items: center;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 36px;"></i>
                    <div>
                        <h4 style="font-size: 18px; color: #ef4444; margin-bottom: 4px;">MÃ KHÔNG HỢP LỆ HOẶC KHÔNG TỒN TẠI</h4>
                        <p>Mã <code>${cleaned}</code> không tìm thấy trong hệ thống quản lý lưu trữ chứng nhận của HR1Vietnam.</p>
                    </div>
                </div>
            `;
        }
    }

    if (btnVerifyNow) {
        btnVerifyNow.addEventListener('click', () => verifyCertCode(inputVerifyCode ? inputVerifyCode.value : ''));
    }
    if (inputVerifyCode) {
        inputVerifyCode.addEventListener('keypress', (e) => { if (e.key === 'Enter') verifyCertCode(inputVerifyCode.value); });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const verifyParam = urlParams.get('verify');
    if (verifyParam) {
        navButtons[1].click();
        inputVerifyCode.value = verifyParam;
        verifyCertCode(verifyParam);
    }

    // ----------------------------------------------------------------------
    // 8. ADMIN MANAGEMENT TABLE
    // ----------------------------------------------------------------------
    function renderAdminTable() {
        if (!tableStudentsBody) return;
        tableStudentsBody.innerHTML = '';
        if (statTotalStudents) statTotalStudents.textContent = studentDatabase.length;

        const displayList = studentDatabase.slice(0, 200);

        displayList.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${student.mssv}</strong></td>
                <td>${student.name}</td>
                <td>${student.class}</td>
                <td>${student.faculty}</td>
                <td>${formatDate(student.date)}</td>
                <td><code>${student.certId}</code></td>
                <td>
                    <button class="btn-delete" data-index="${index}" title="Xóa"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            `;
            tableStudentsBody.appendChild(tr);
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                if (confirm(`Bạn có chắc muốn xóa sinh viên ${studentDatabase[idx].name} khỏi danh sách?`)) {
                    studentDatabase.splice(idx, 1);
                    renderAdminTable();
                }
            });
        });
    }

    function removeDiacritics(str) {
        return str.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/đ/g, "d")
                  .replace(/Đ/g, "D");
    }

    function importStudentMatrix(matrix, fileType) {
        if (!matrix || matrix.length === 0) {
            alert(`Tệp ${fileType} không có dữ liệu!`);
            return;
        }

        let headerRowIndex = -1;
        let mssvColIndex = -1, hoLotColIndex = -1, tenColIndex = -1, fullNameColIndex = -1;
        let classColIndex = -1, facultyColIndex = -1, dateColIndex = -1;

        for (let r = 0; r < Math.min(matrix.length, 30); r++) {
            const row = matrix[r];
            if (!row || !Array.isArray(row)) continue;

            for (let c = 0; c < row.length; c++) {
                const cell = row[c] ? removeDiacritics(row[c].toString().trim().toLowerCase()) : "";
                if (cell.includes("mssv") || cell.includes("ma sv") || cell.includes("ma sinh vien") || cell.includes("masv") || cell.includes("ma_sv") || cell === "ms sv" || cell === "ma so sv") {
                    headerRowIndex = r;
                    mssvColIndex = c;
                    break;
                }
            }
            if (headerRowIndex !== -1) break;
        }

        if (headerRowIndex !== -1) {
            const headerRow = matrix[headerRowIndex];
            for (let c = 0; c < headerRow.length; c++) {
                if (c === mssvColIndex) continue;
                const cell = headerRow[c] ? removeDiacritics(headerRow[c].toString().trim().toLowerCase()) : "";
                
                if (cell.includes("ho lot") || cell.includes("ho va ten lot") || cell.includes("ho & ten lot") || cell === "ho" || cell.includes("holotsv")) {
                    hoLotColIndex = c;
                } else if (cell === "ten" || cell.includes("tensv") || cell.includes("ten sinh vien")) {
                    tenColIndex = c;
                } else if (cell.includes("ho ten") || cell.includes("ho va ten") || cell.includes("full name") || cell === "name") {
                    fullNameColIndex = c;
                } else if (cell.includes("lop") || cell.includes("class") || cell.includes("malop")) {
                    classColIndex = c;
                } else if (cell.includes("khoa") || cell.includes("vien") || cell.includes("faculty")) {
                    facultyColIndex = c;
                } else if (cell.includes("ngay") || cell.includes("date") || cell.includes("tour") || cell.includes("thoi gian") || cell.includes("time") || cell.includes("gio")) {
                    dateColIndex = c;
                }
            }
        }

        let addedCount = 0;
        const startRow = headerRowIndex !== -1 ? headerRowIndex + 1 : 0;

        for (let r = startRow; r < matrix.length; r++) {
            const row = matrix[r];
            if (!row || !Array.isArray(row)) continue;

            let mssv = "", hoLot = "", ten = "", fullNameDirect = "";
            let studentClass = "25DLQA3", faculty = "Quản trị & Du lịch HUTECH", date = "2026-03-13";

            if (headerRowIndex !== -1) {
                if (mssvColIndex !== -1 && row[mssvColIndex] !== undefined) mssv = row[mssvColIndex].toString().trim();
                if (hoLotColIndex !== -1 && row[hoLotColIndex] !== undefined) hoLot = row[hoLotColIndex].toString().trim();
                if (tenColIndex !== -1 && row[tenColIndex] !== undefined) ten = row[tenColIndex].toString().trim();
                if (fullNameColIndex !== -1 && row[fullNameColIndex] !== undefined) fullNameDirect = row[fullNameColIndex].toString().trim();
                if (classColIndex !== -1 && row[classColIndex] !== undefined) studentClass = row[classColIndex].toString().trim();
                if (facultyColIndex !== -1 && row[facultyColIndex] !== undefined) faculty = row[facultyColIndex].toString().trim();
                if (dateColIndex !== -1 && row[dateColIndex] !== undefined) date = formatDate(row[dateColIndex].toString().trim());
            }

            let finalFullName = "";
            if (hoLot && ten) {
                finalFullName = `${hoLot} ${ten}`.replace(/\s+/g, ' ').trim();
            } else if (fullNameDirect) {
                finalFullName = fullNameDirect;
            }

            if (mssv && finalFullName && mssv.toLowerCase() !== "mssv") {
                const existingIdx = studentDatabase.findIndex(s => s.mssv === mssv);
                const newCertId = `HR1-HT-2026-${1000 + studentDatabase.length + 1}`;

                const newObj = {
                    mssv: mssv,
                    name: finalFullName,
                    class: studentClass || "25DLQA3",
                    faculty: faculty || "Quản trị & Du lịch HUTECH",
                    date: date || "2026-03-13",
                    topic: "Quy Trình Tuyển Dụng Thực Chiến & Phát Triển Năng Lực Nhân Sự Trong Doanh Nghiệp",
                    certId: newCertId
                };

                if (existingIdx >= 0) {
                    studentDatabase[existingIdx] = newObj;
                } else {
                    studentDatabase.push(newObj);
                }
                addedCount++;
            }
        }

        if (addedCount > 0) {
            alert(`✅ Đã nạp thành công ${addedCount} sinh viên mới!`);
            renderAdminTable();
        } else {
            alert("⚠️ Chưa đọc được dữ liệu. Vui lòng kiểm tra lại cấu trúc bảng!");
        }
    }

    function parseExcelOrCsvFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const matrix = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

                importStudentMatrix(matrix, "Excel/CSV");
            } catch (err) {
                alert("Lỗi khi đọc file Excel/CSV: " + err.message);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    function parseWordDocxFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            
            window.mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(function(result) {
                    const html = result.value;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const tables = doc.querySelectorAll('table');
                    
                    if (tables.length === 0) {
                        alert("Không tìm thấy bảng dữ liệu nào trong tệp Word!");
                        return;
                    }
                    
                    const matrix = [];
                    tables.forEach(table => {
                        const rows = table.querySelectorAll('tr');
                        rows.forEach(row => {
                            const cols = row.querySelectorAll('td, th');
                            const rowData = [];
                            cols.forEach(col => {
                                rowData.push(col.textContent ? col.textContent.trim() : "");
                            });
                            matrix.push(rowData);
                        });
                    });
                    
                    importStudentMatrix(matrix, "Word (.docx)");
                })
                .catch(function(err) {
                    alert("Lỗi khi giải mã tệp Word: " + err.message);
                });
        };
        reader.readAsArrayBuffer(file);
    }

    function handleUploadedFile(file) {
        if (!file) return;
        const extension = file.name.split('.').pop().toLowerCase();
        if (extension === 'docx') {
            parseWordDocxFile(file);
        } else if (extension === 'xlsx' || extension === 'xls' || extension === 'csv') {
            parseExcelOrCsvFile(file);
        } else {
            alert('Chỉ hỗ trợ định dạng Excel (.xlsx, .xls), CSV (.csv) hoặc Word (.docx)!');
        }
    }

    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        });

        dropZone.addEventListener('dragover', () => dropZone.classList.add('dragover'));
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

        dropZone.addEventListener('drop', (e) => {
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) handleUploadedFile(e.dataTransfer.files[0]);
        });
    }

    if (fileUploadInput) {
        fileUploadInput.addEventListener('change', (e) => {
            if (e.target.files.length) handleUploadedFile(e.target.files[0]);
        });
    }

    if (btnToggleAddModal) {
        btnToggleAddModal.addEventListener('click', () => modalAddStudent.classList.remove('hidden'));
    }
    
    document.querySelectorAll('[data-close]').forEach(el => {
        el.addEventListener('click', () => {
            const modalId = el.getAttribute('data-close');
            document.getElementById(modalId).classList.add('hidden');
        });
    });

    if (formAddStudent) {
        formAddStudent.addEventListener('submit', (e) => {
            e.preventDefault();
            const mssv = document.getElementById('add-mssv').value;
            const name = document.getElementById('add-name').value;
            const studentClass = document.getElementById('add-class').value;
            const faculty = document.getElementById('add-faculty').value;
            const date = document.getElementById('add-date').value;

            const newCertId = `HR1-HT-2026-${1000 + studentDatabase.length + 1}`;
            studentDatabase.push({
                mssv, name, class: studentClass, faculty, date,
                topic: "Quy Trình Tuyển Dụng Thực Chiến & Phát Triển Năng Lực Nhân Sự Trong Doanh Nghiệp",
                certId: newCertId
            });

            alert('Đã thêm sinh viên mới thành công!');
            modalAddStudent.classList.add('hidden');
            formAddStudent.reset();
            renderAdminTable();
        });
    }

    if (btnExportDatabase) {
        btnExportDatabase.addEventListener('click', () => {
            const jsContent = `window.INITIAL_STUDENTS_DATABASE = ${JSON.stringify(studentDatabase, null, 2)};\n`;
            const blob = new Blob([jsContent], { type: 'application/javascript;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'students_data.js');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    if (btnClearDatabase) {
        btnClearDatabase.addEventListener('click', () => {
            if (confirm("CẢNH BÁO: Hành động này sẽ làm trống danh sách sinh viên hiện tại trong phiên làm việc này để bạn nạp mới từ đầu. Bạn có chắc chắn muốn xóa sạch?")) {
                studentDatabase = [];
                renderAdminTable();
                alert("Đã làm trống danh sách! Bây giờ bạn hãy kéo thả 2 file Word/Excel mới vào để nạp từ đầu.");
            }
        });
    }

});
