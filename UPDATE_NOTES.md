# NHẬT KÝ CẬP NHẬT GIAO DIỆN & NỘI DUNG (RELEASE NOTES)
**Dự án:** HR1Vietnam Education Partnership Hub
**Phiên bản cập nhật:** V1.2.0 (Final Revision)
**Thời gian:** 30/07/2026
**Tác giả:** Antigravity Pairing Agent

---

## 1. Tóm Tắt Các Điểm Cập Nhật Mới

### 1.1. Điều chỉnh Giao diện Đầu trang (Hero Section)
* **Khung Play Video Ngang:** Đã tái thiết kế khung phát video `.video-chip` sang dạng nằm ngang, đưa nút Play sang trái và khối chữ sang phải để tạo sự cân đối.
* **Độ rộng bằng ảnh bìa:** Thay đổi kích thước chiều rộng từ `300px` cố định thành tự động co giãn (`left: 0; right: 18px; width: auto`) giúp chiều rộng của khung khớp khít hoàn hảo với chiều rộng của ảnh bìa phía trên.
* **Sát viền dưới ảnh bìa:** Thay vì nằm ở đáy, khung video được đưa lên vị trí `bottom: 44px` sát dưới viền đỏ bóng đổ của ảnh bìa, tạo liên kết thị giác rõ ràng với ảnh chính.
* **Hiệu ứng tương tác (Hover Motion):** Bổ sung con trỏ tay (`cursor: pointer`) và hiệu ứng hover nhấc nhẹ (`transform: translate(-4px, -4px)`) cùng bóng đổ dày lên tương tự như các nút bấm chính, gia tăng trải nghiệm click. Toàn bộ bề mặt của khung video giờ đây đều có thể click để phát video Vlog HUTECH.

### 1.2. Cập nhật Số thứ tự các Section (01 - 07)
* **Hiệu ứng Fill màu và Motion:** 
  - **Nền Trắng/Be (01, 03, 04, 06, 07):** Khi rê chuột vào tiêu đề section, số thứ tự (đang ở viền đỏ rỗng) sẽ tự động đổ đầy (**Fill**) màu Đỏ tươi và trượt nhẹ lên trên (`translateY(-4px)`).
  - **Nền Xanh Đen (02):** Chuyển đổi viền từ đỏ sang trắng (tĩnh), khi rê chuột vào sẽ đổ đầy (**Fill**) màu Trắng và trượt nhẹ lên trên.
  - **Nền Đỏ (05):** Chuyển đổi viền đỏ chìm sang viền Trắng nổi bật (tĩnh), khi rê chuột vào sẽ đổ đầy (**Fill**) màu Trắng và trượt nhẹ lên trên.

### 1.3. Cập nhật Logo rút gọn HR1Vietnam Holdings (1 hàng)
* **Bản logo 1 hàng mới:** Thay thế logo cũ (2 dòng chữ) bằng logo 1 hàng ngang mới (`HR1Vietnam-white-optional.png`) chất lượng cao.
* **Tối ưu hóa tỷ lệ:** Định cấu hình hiển thị đặc quyền `max-width: 240px;` giúp logo hiển thị cân đối và rõ nét, cho chiều cao tương đồng với logo `HR1Jobs` và `HR1Tech` (~26px) mang lại cảm giác bề thế và chuyên nghiệp hơn.

### 1.4. Tích hợp Video giới thiệu mới tại mục "01. CAREER READINESS GAP"
* **Bố cục dọc dạng Card (Tách biệt với khối chữ):** Khung phát video đã được thiết kế thành một Card dọc riêng biệt nằm dưới khối chữ `.gap-text-card`. 
* **Ảnh thu nhỏ tràn viền lớn hơn:** Đặt chiều rộng ảnh thumbnail là `100%` (aspect-ratio 16/9) tràn viền khít với mép của khối chữ phía trên. Tiêu đề và mô tả được chuyển xuống dưới ảnh thu nhỏ trong vùng đệm thoáng đãng.
* **Thumbnail gốc từ YouTube:** Hình ảnh đại diện (thumbnail) của video giới thiệu được lấy tự động trực tiếp từ link gốc của YouTube (`https://img.youtube.com/vi/___EZpl2N5c/hqdefault.jpg`) giúp đồng bộ hiển thị chuẩn xác nhất.
* **Trình phát Video Động (Dynamic Video Modal):** Nâng cấp hàm `openVideo` trong Javascript để tự động lấy ID Video từ thuộc tính `data-video` của từng nút kích hoạt. Giờ đây, trang web sử dụng một Modal chung để phát cả video Vlog trải nghiệm HUTECH (`vOjOEKsJE44`) và video giới thiệu Education Hub mới (`___EZpl2N5c`).

### 1.5. Chuyển đổi ảnh Flagship Workshop thành Slide cuộn ngang
* **Slide Gallery trượt:** Tại phần **04. FLAGSHIP WORKSHOP**, ảnh tĩnh đơn đã được đổi sang hệ thống Slide ảnh cuộn ngang tự động bắt điểm (`scroll-snap-type: x mandatory`) gồm 3 ảnh thực tế tại Đại học Công Thương. Có trang bị 2 nút mũi tên trái/phải (`←` và `→`) để hỗ trợ duyệt ảnh mượt mà trên cả Desktop lẫn Mobile.
* **Tối ưu hóa ảnh WebP:** 3 ảnh gốc đã được cắt cúp theo tỷ lệ 3:2, thu nhỏ kích thước và nén định dạng WebP chất lượng cao (dung lượng nén cực nhẹ ~60KB - 110KB/file) để đảm bảo tốc độ tải trang tối ưu.

### 1.6. Thiết kế lại Cổng Chứng Chỉ (E-Certificate Portal CTA)
* **Điểm nhấn Tương phản cao:** Loại bỏ hoàn toàn màu nền đỏ đô (tránh cảm giác ngột ngạt và lặp lại màu sắc của section).
* **Thiết kế Navy Box V2:** Khung CTA đổi sang màu xanh biển mực đậm **Ink Navy (`#101828`)**, bo viền màu Đỏ tươi HR1 (`#B11116`), kèm bóng đổ phẳng dày dặn màu đen (`box-shadow: 12px 12px 0 #000;`).
* **Hiệu ứng Hover:** Khi di chuột, khối CTA sẽ nhấc nhẹ lên trên (`transform: translate(-4px, -4px)`) và bóng đổ dày lên, tạo cảm giác nổi bật và thúc đẩy click cực tốt.

### 1.7. Tích hợp Thư Mời Hợp Tác định dạng PDF
* **Xuất file PDF Chuyên nghiệp (1 trang duy nhất):** Thiết kế lại Thư mời hợp tác định dạng PDF từ bản docx gốc của bạn. File PDF sử dụng logo chuẩn thương hiệu có màu (`hr1logo-color.png`), áp dụng phông chữ Lora & Be Vietnam Pro của website, đóng khung thẻ liên hệ màu Ink Navy và câu hỏi Hook nổi bật trên nền đỏ nhạt. Tài liệu được dàn đều vừa khít 1 trang A4 duy nhất, có Safezone lề trang `1.5cm` sạch sẽ không chứa ngày giờ hay link URL.
* **Thay thế nút đăng ký:** Thay đổi tên nút **"Tải Master Content"** thành **"Thư Mời Hợp Tác"** tại form liên hệ ở chân trang, trỏ đường dẫn tải trực tiếp đến file PDF mới: `assets/docs/Thu_Moi_Hop_Tac_HR1Vietnam.pdf`.

### 1.8. Sửa lỗi dính chữ/dấu giữa các dòng tiêu đề lớn (QA/QC Line-Height)
* **Tách giãn khoảng cách dòng:** Căn chỉnh giãn cách dòng (`line-height`) tăng lên **`1.08`** (trước đây là `.94` và `.98`) cho cụm tiêu đề lớn ở phần CTA đăng ký cuối trang (`.cta-copy h2`) và tiêu đề các section (`.section-title`). Sự thay đổi này tạo khoảng trống an toàn tối thiểu 1 point, đảm bảo các nguyên âm, phụ âm có dấu và dấu mũ của tiếng Việt ở dòng dưới không bao giờ bị dính hay đè lên các chữ ở dòng trên.

### 1.9. Làm gọn giao diện (Xóa Accordion rỗng)
* **Ẩn Accordion phụ:** Ẩn toàn bộ các thanh accordion "Xem toàn bộ nội dung final..." ở cuối mỗi section bằng CSS `display: none !important`. Điều này giúp trang web gọn gàng, giảm thiểu trải nghiệm dư thừa cho người dùng cuối khi chạy production.

### 1.10. Hoàn thiện Footer & Biểu tượng mạng xã hội (Social Icons)
* **Cập nhật Liên kết Hệ sinh thái:** 
  * `HR1Jobs` -> Đổi thành link liên kết đến `https://hr1jobs.com/` (Nền tảng tuyển dụng đa ngành nghề).
  * `HR1Tech` -> Đổi thành link liên kết đến `https://hr1tech.com/` (Nền tảng tuyển dụng ngành CNTT).
* **Bổ sung Social Icons:** Chèn cụm icon ở cột mô tả đầu tiên:
  * **Facebook:** Link dẫn về Fanpage chính thức.
  * **LinkedIn:** Link dẫn về trang Company chính thức.
  * **Zalo:** Bổ sung icon SVG Zalo tối giản thiết kế riêng (nét mảnh mượt mà, đồng bộ ngôn ngữ Feather Icons).

---

## 2. Chi Tiết File Thay Đổi (Technical Changelog)

* **[MODIFY] [index.html](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/index.html)**
  * Chèn thẻ `.gap-video-card` kèm `data-video="___EZpl2N5c"` tại dòng ~107.
  * Thay thế `.flagship-image` bằng `.flagship-gallery-wrap` tại dòng ~617.
  * Đổi liên kết nút tải Master Content sang file `.pdf` tại dòng ~1536.
  * Cập nhật footer: thay thế text/link của Ecosystem, chèn cụm `.footer-socials` chứa icon FB, LinkedIn và SVG Zalo tại dòng ~1725.
  * Cập nhật giá trị thuộc tính `data-video="vOjOEKsJE44"` cho toàn bộ các nút phát video Vlog cũ để Modal nhận diện động.
* **[MODIFY] [styles.css](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/css/styles.css)**
  * Giảm kích thước và hạ vị trí `.video-chip` (dòng 76).
  * Ẩn `.master-detail` bằng thuộc tính `display: none!important` (dòng 270).
  * Thêm flexbox và style hover cho `.process-step`, bổ sung `.process-icon` (dòng 238).
  * Thiết kế lại `.case-cta-box` nền Ink Navy, viền đỏ, bóng đổ và hover lift-up (dòng 334).
  * Bổ sung class `.gap-video-card` và các class con liên quan (dòng 487+).
  * Bổ sung class `.flagship-gallery-wrap`, `.flagship-gallery`, các nút chuyển hình và nhãn đè (dòng 550+).
  * Bổ sung class `.footer-socials` định dạng màu sắc và hiệu ứng hover (dòng 613+).
* **[MODIFY] [app.js](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/js/app.js)**
  * Sửa hàm `openVideo` để đọc động thuộc tính `data-video` của thẻ kích hoạt click (dòng 78).
  * Bổ sung logic trượt hình bằng nút bấm và quản lý trạng thái disabled của các nút cho gallery `#flagship-gallery` (dòng 55).
* **[NEW] [workshop-dhct-01.webp](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/images/workshop-dhct-01.webp)** & **[-900.webp](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/images/workshop-dhct-01-900.webp)**
* **[NEW] [workshop-dhct-02.webp](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/images/workshop-dhct-02.webp)** & **[-900.webp](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/images/workshop-dhct-02-900.webp)**
* **[NEW] [workshop-dhct-03.webp](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/images/workshop-dhct-03.webp)** & **[-900.webp](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/images/workshop-dhct-03-900.webp)**
* **[NEW] [Thu_Moi_Hop_Tac_HR1Vietnam.pdf](file:///Users/lamduc/.gemini/antigravity/scratch/hr1-education-hub/assets/docs/Thu_Moi_Hop_Tac_HR1Vietnam.pdf)**

---

## 3. Hướng Dẫn Deploy Lên GitHub (Cho Khách Hàng)

Để cập nhật toàn bộ các chỉnh sửa trên lên trang GitHub chính thức của bạn, bạn có thể thực hiện theo các bước sau trong ứng dụng Terminal hoặc VS Code:

1. **Kiểm tra các commit mới đã tạo ở local:**
   ```bash
   git log -n 3
   ```
2. **Đẩy toàn bộ thay đổi lên nhánh main trên GitHub:**
   ```bash
   git push origin main
   ```
   *(Sau khi chạy lệnh trên, hệ thống GitHub Actions sẽ tự động biên dịch và cập nhật lên trang web trực tuyến trong vòng 1-2 phút).*
