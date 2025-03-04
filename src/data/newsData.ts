
import { NewsItem } from '@/components/NewsCard';

// Mock news data
export const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Tổng Bí thư: Nghiên cứu xử lý nghiêm vụ giấu dự án quốc gia, làm công trình thuế',
    source: 'VnExpress',
    category: 'Chính trị',
    timestamp: '3 giờ trước',
    image: 'https://i1-vnexpress.vnecdn.net/2023/11/05/tbt-nguyen-phu-trong-1-jpeg-1699180793.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=RyQJ11f_5Z0RjIuTr1EebA',
    summary: 'Tổng Bí thư Nguyễn Phú Trọng yêu cầu nghiên cứu xử lý nghiêm các đối tượng liên quan đến vụ giấu dự án quốc gia và làm công trình thuế.',
    slug: 'tong-bi-thu-nghien-cuu-xu-ly-nghiem-vu-giau-du-an-quoc-gia',
    published_at: '2023-11-05T10:00:00Z'
  },
  {
    id: '2',
    title: 'Giảm 15 - 17 trường đào tạo sĩ quan trong 5 năm',
    source: 'Tuổi Trẻ',
    category: 'Giáo dục',
    timestamp: '4 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Bộ Quốc phòng đề xuất giảm số lượng các trường đào tạo sĩ quan trong 5 năm tới, nhằm nâng cao chất lượng đào tạo.',
    slug: 'giam-15-17-truong-dao-tao-si-quan-trong-5-nam',
    published_at: '2023-11-05T09:00:00Z'
  },
  {
    id: '3',
    title: 'Thủ tướng chỉ đạo đề điều chỉnh pháp Internet về tinh thần Starlink',
    source: 'Dân Trí',
    category: 'Công nghệ',
    timestamp: '5 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Thủ tướng Chính phủ vừa có chỉ đạo về việc điều chỉnh các quy định pháp lý liên quan đến dịch vụ Internet vệ tinh Starlink.',
    slug: 'thu-tuong-chi-dao-dieu-chinh-phap-internet-ve-tinh-starlink',
    published_at: '2023-11-05T08:00:00Z'
  },
  {
    id: '4',
    title: 'Bộ Chính trị yêu cầu dừng kế hoạch đầu tư dàn bố cáp xã, cấp huyện',
    source: 'VnExpress',
    category: 'Chính trị',
    timestamp: '6 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Bộ Chính trị đã có chỉ đạo dừng kế hoạch đầu tư hệ thống cáp quang tại các xã và huyện trên toàn quốc.',
    slug: 'bo-chinh-tri-yeu-cau-dung-ke-hoach-dau-tu-dan-cap-xa-huyen',
    published_at: '2023-11-05T07:00:00Z'
  },
  {
    id: '5',
    title: 'Bắt giữ nghi phạm lần thứ hai sát hại người phụ nữ lượm ve chai ở Ninh Bình',
    source: 'Báo Mới',
    category: 'Pháp luật',
    timestamp: '6 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Công an tỉnh Ninh Bình đã bắt giữ nghi phạm trong vụ án sát hại người phụ nữ lượm ve chai tại địa phương.',
    slug: 'bat-giu-nghi-pham-sat-hai-nguoi-phu-nu-luom-ve-chai-o-ninh-binh',
    published_at: '2023-11-05T07:00:00Z'
  },
  {
    id: '6',
    title: 'Ăn sáng xong là đi ngoài, ngày đi nhiều lần, cảnh giác dấu hiệu của thuốc lậu, thương tâm',
    source: 'Sức khỏe & Đời sống',
    category: 'Sức khỏe',
    timestamp: '7 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Các chuyên gia cảnh báo về tình trạng sử dụng thuốc lậu có thể dẫn đến các vấn đề tiêu hóa nghiêm trọng.',
    slug: 'an-sang-xong-la-di-ngoai-ngay-di-nhieu-lan-canh-giac-dau-hieu-cua-thuoc-lau',
    published_at: '2023-11-05T06:00:00Z'
  },
  {
    id: '7',
    title: 'Thủ tướng Campuchia đích thân dẫn đầu lực lượng đặc nhiệm triệt phá lừa đảo',
    source: 'Người Lao Động',
    category: 'Thế giới',
    timestamp: '3 giờ trước',
    image: 'https://cdn.24h.com.vn/upload/1-2024/images/2024-03-01/Noi-duong-day-lua-dao-di-bang-duong-hang-khong-tiet-lo-so-tien-khung-1709289979-31-width1600height1066.jpg',
    summary: 'Thủ tướng Campuchia Hun Manet đã trực tiếp chỉ đạo lực lượng đặc nhiệm triệt phá đường dây lừa đảo quốc tế.',
    slug: 'thu-tuong-campuchia-dich-than-dan-dau-luc-luong-dac-nhiem-triet-pha-lua-dao',
    published_at: '2023-11-05T10:00:00Z'
  },
  {
    id: '8',
    title: 'Ông Nguyễn Hồ Nam, bà Huỳnh Thị Kim Tuyến bị khởi tố',
    source: 'VTV News',
    category: 'Pháp luật',
    timestamp: '3 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Cơ quan điều tra đã khởi tố bị can đối với ông Nguyễn Hồ Nam và bà Huỳnh Thị Kim Tuyến về tội danh liên quan đến hoạt động kinh doanh.',
    slug: 'ong-nguyen-ho-nam-ba-huynh-thi-kim-tuyen-bi-khoi-to',
    published_at: '2023-11-05T10:00:00Z'
  },
  {
    id: '9',
    title: 'Người Ukraine nói gì sau khi ông Zelensky đấu khẩu với ông Trump?',
    source: 'Người Đưa Tin',
    category: 'Thế giới',
    timestamp: '2 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Người dân Ukraine bày tỏ nhiều quan điểm khác nhau sau cuộc đấu khẩu giữa Tổng thống Zelensky và cựu Tổng thống Mỹ Donald Trump.',
    slug: 'nguoi-ukraine-noi-gi-sau-khi-ong-zelensky-dau-khau-voi-ong-trump',
    published_at: '2023-11-05T11:00:00Z'
  },
  {
    id: '10',
    title: 'Trump và Zelensky tranh luận gay gắt tại phòng Bầu cử',
    source: 'VOV',
    category: 'Nóng 24h',
    timestamp: '17 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Cựu Tổng thống Mỹ Donald Trump và Tổng thống Ukraine Volodymyr Zelensky đã có cuộc tranh luận gay gắt tại một sự kiện liên quan đến bầu cử.',
    slug: 'trump-va-zelensky-tranh-luan-gay-gat-tai-phong-bau-cu',
    published_at: '2023-11-04T20:00:00Z'
  },
  {
    id: '11',
    title: 'Phát hiện thi thể nữ sinh trong bao tải ven đường: Hé lộ manh mối điều tra',
    source: 'PLO',
    category: 'Pháp luật',
    timestamp: '22 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Cơ quan điều tra đang làm rõ vụ việc phát hiện thi thể nữ sinh trong bao tải ở ven đường, với những manh mối ban đầu.',
    slug: 'phat-hien-thi-the-nu-sinh-trong-bao-tai-ven-duong-he-lo-manh-moi-dieu-tra',
    published_at: '2023-11-04T15:00:00Z'
  },
  {
    id: '12',
    title: 'DOGE, tỉ phú Elon Musk và "bức tường sao kê" rẽ đổi nước Mỹ',
    source: 'Người Đưa Tin',
    category: 'Kinh tế',
    timestamp: '11 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    summary: 'Đồng tiền điện tử DOGE, tỉ phú Elon Musk và những ảnh hưởng đến nền kinh tế Mỹ thông qua hiện tượng "bức tường sao kê".',
    slug: 'doge-ti-phu-elon-musk-va-buc-tuong-sao-ke-re-doi-nuoc-my',
    published_at: '2023-11-05T02:00:00Z'
  }
];

export const trendingNews: NewsItem[] = [
  {
    id: '7',
    title: 'Thủ tướng Campuchia đích thân dẫn đầu lực lượng đặc nhiệm triệt phá lừa đảo',
    source: 'Người Lao Động',
    category: 'Thế giới',
    timestamp: '3 giờ trước',
    image: 'https://cdn.24h.com.vn/upload/1-2024/images/2024-03-01/Noi-duong-day-lua-dao-di-bang-duong-hang-khong-tiet-lo-so-tien-khung-1709289979-31-width1600height1066.jpg',
    slug: 'thu-tuong-campuchia-dich-than-dan-dau-luc-luong-dac-nhiem-triet-pha-lua-dao',
    published_at: '2023-11-05T10:00:00Z'
  },
  {
    id: '8',
    title: 'Ông Nguyễn Hồ Nam, bà Huỳnh Thị Kim Tuyến bị khởi tố',
    source: 'VTV News',
    category: 'Pháp luật',
    timestamp: '3 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'ong-nguyen-ho-nam-ba-huynh-thi-kim-tuyen-bi-khoi-to',
    published_at: '2023-11-05T10:00:00Z'
  },
  {
    id: '9',
    title: 'Người Ukraine nói gì sau khi ông Zelensky đấu khẩu với ông Trump?',
    source: 'Người Đưa Tin',
    category: 'Thế giới',
    timestamp: '2 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'nguoi-ukraine-noi-gi-sau-khi-ong-zelensky-dau-khau-voi-ong-trump',
    published_at: '2023-11-05T11:00:00Z'
  }
];

export const hotNews: NewsItem[] = [
  {
    id: '10',
    title: 'Trump và Zelensky tranh luận gay gắt tại phòng Bầu cử',
    source: 'VOV',
    category: 'Nóng 24h',
    timestamp: '17 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'trump-va-zelensky-tranh-luan-gay-gat-tai-phong-bau-cu',
    published_at: '2023-11-04T20:00:00Z'
  },
  {
    id: '11',
    title: 'Tổng thống Zelensky không xin lỗi ông Trump, Mỹ dừng hỗ trợ Ukraine',
    source: 'Vietnamnet',
    category: 'Thế giới',
    timestamp: '11 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'tong-thong-zelensky-khong-xin-loi-ong-trump-my-dung-ho-tro-ukraine',
    published_at: '2023-11-05T02:00:00Z'
  },
  {
    id: '12',
    title: 'Phát hiện thi thể nữ sinh trong bao tải ven đường: Hé lộ manh mối điều tra',
    source: 'PLO',
    category: 'Pháp luật',
    timestamp: '22 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'phat-hien-thi-the-nu-sinh-trong-bao-tai-ven-duong-he-lo-manh-moi-dieu-tra',
    published_at: '2023-11-04T15:00:00Z'
  }
];

export const analyticNews: NewsItem[] = [
  {
    id: '13',
    title: 'DOGE, tỉ phú Elon Musk và "bức tường sao kê" rẽ đổi nước Mỹ',
    source: 'Anninhthudo',
    category: 'Kinh tế',
    timestamp: '11 giờ trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'doge-ti-phu-elon-musk-va-buc-tuong-sao-ke-re-doi-nuoc-my',
    published_at: '2023-11-05T02:00:00Z'
  },
  {
    id: '14',
    title: 'Vì sao Mỹ khó đạt lại nhuận "vàng" từ con bài khoáng sản đối với Ukraine?',
    source: 'VOV',
    category: 'Thế giới',
    timestamp: '1 ngày trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'vi-sao-my-kho-dat-lai-nhuan-vang-tu-con-bai-khoang-san-doi-voi-ukraine',
    published_at: '2023-11-04T12:00:00Z'
  },
  {
    id: '15',
    title: 'Mối đe dọa lớn đối với ngành công nghiệp ô tô châu Âu',
    source: 'Bnews',
    category: 'Kinh tế',
    timestamp: '1 ngày trước',
    image: 'https://random.imagecdn.app/500/300',
    slug: 'moi-de-doa-lon-doi-voi-nganh-cong-nghiep-o-to-chau-au',
    published_at: '2023-11-04T11:00:00Z'
  }
];
