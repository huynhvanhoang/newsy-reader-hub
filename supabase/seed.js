
// This is a sample script to help seed your database with some demo data
// You can run this file by copying these SQL statements and running them in the Supabase SQL Editor

/*
-- Sample categories
INSERT INTO categories (name, slug, color, icon, image) 
VALUES 
('Nóng', 'nong', '#ff4757', 'trending-up', 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'),
('Mới', 'moi', '#2ed573', 'zap', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'),
('Bóng đá VN', 'bong-da-vn', '#1e90ff', 'dribbble', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'),
('Bóng đá QT', 'bong-da-qt', '#3742fa', 'globe', 'https://images.unsplash.com/photo-1493924927302-c1ed60b82481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'),
('Đọc & Lạ', 'doc-la', '#ff6b81', 'book-open', 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80');

-- Sample hashtags
INSERT INTO hashtags (name, slug)
VALUES 
('TổngBíThư', 'tong-bi-thu'),
('ChínhTrị', 'chinh-tri'),
('Thượng đỉnh', 'thuong-dinh'),
('Trump', 'trump'),
('Bóng đá', 'bong-da'),
('SứcKhỏe', 'suc-khoe'),
('Công nghệ', 'cong-nghe'),
('Giáo dục', 'giao-duc');

-- Sample articles
INSERT INTO articles (title, slug, content, summary, image_url, category_id, views, is_featured, published_at)
VALUES 
(
  'Tổng Bí thư: Nghiên cứu xử lý nghiêm vụ giấu dự án quốc gia, làm công trình thuế', 
  'tong-bi-thu-nghien-cuu-xu-ly-nghiem-vu-giau-du-an-quoc-gia', 
  'Nội dung bài viết về phát biểu của Tổng Bí thư...',
  'Tổng Bí thư Nguyễn Phú Trọng yêu cầu nghiên cứu xử lý nghiêm các đối tượng liên quan đến vụ giấu dự án quốc gia và làm công trình thuế.',
  'https://i1-vnexpress.vnecdn.net/2023/11/05/tbt-nguyen-phu-trong-1-jpeg-1699180793.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=RyQJ11f_5Z0RjIuTr1EebA',
  1, 
  5200, 
  true,
  NOW() - INTERVAL '3 hours'
),
(
  'Giảm 15 - 17 trường đào tạo sĩ quan trong 5 năm', 
  'giam-15-17-truong-dao-tao-si-quan-trong-5-nam', 
  'Nội dung bài viết về việc giảm số lượng trường đào tạo sĩ quan...',
  'Bộ Quốc phòng đề xuất giảm số lượng các trường đào tạo sĩ quan trong 5 năm tới, nhằm nâng cao chất lượng đào tạo.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870&auto=format&fit=crop',
  2, 
  3800, 
  false,
  NOW() - INTERVAL '4 hours'
),
(
  'Thủ tướng chỉ đạo đề điều chỉnh pháp Internet về tinh thần Starlink', 
  'thu-tuong-chi-dao-dieu-chinh-phap-internet-ve-tinh-starlink', 
  'Nội dung bài viết về chỉ đạo của Thủ tướng liên quan đến dịch vụ Internet Starlink...',
  'Thủ tướng Chính phủ vừa có chỉ đạo về việc điều chỉnh các quy định pháp lý liên quan đến dịch vụ Internet vệ tinh Starlink.',
  'https://images.unsplash.com/photo-1614064642621-9a325242f47a?q=80&w=870&auto=format&fit=crop',
  5, 
  4200, 
  true,
  NOW() - INTERVAL '5 hours'
),
(
  'Thủ tướng Campuchia đích thân dẫn đầu lực lượng đặc nhiệm triệt phá lừa đảo', 
  'thu-tuong-campuchia-dich-than-dan-dau-luc-luong-dac-nhiem-triet-pha-lua-dao', 
  'Nội dung bài viết về hoạt động triệt phá lừa đảo tại Campuchia...',
  'Thủ tướng Campuchia Hun Manet đã trực tiếp chỉ đạo lực lượng đặc nhiệm triệt phá đường dây lừa đảo quốc tế.',
  'https://cdn.24h.com.vn/upload/1-2024/images/2024-03-01/Noi-duong-day-lua-dao-di-bang-duong-hang-khong-tiet-lo-so-tien-khung-1709289979-31-width1600height1066.jpg',
  1, 
  7500, 
  true,
  NOW() - INTERVAL '3 hours'
),
(
  'Đội tuyển Việt Nam chuẩn bị cho AFF Cup 2024', 
  'doi-tuyen-viet-nam-chuan-bi-cho-aff-cup-2024', 
  'Nội dung bài viết về công tác chuẩn bị của đội tuyển Việt Nam...',
  'HLV Philippe Troussier đã công bố danh sách sơ bộ các cầu thủ chuẩn bị cho giải đấu AFF Cup 2024 sắp tới.',
  'https://images.unsplash.com/photo-1589779255517-c7701c0f41b5?q=80&w=772&auto=format&fit=crop',
  3, 
  6300, 
  true,
  NOW() - INTERVAL '6 hours'
);

-- Link articles to hashtags
INSERT INTO article_hashtags (article_id, hashtag_id)
VALUES 
(1, 1), -- Tổng Bí thư article with TổngBíThư hashtag
(1, 2), -- Tổng Bí thư article with ChínhTrị hashtag
(4, 2), -- Thủ tướng Campuchia article with ChínhTrị hashtag
(5, 5), -- Đội tuyển VN article with Bóng đá hashtag
(3, 7); -- Starlink article with Công nghệ hashtag
*/
