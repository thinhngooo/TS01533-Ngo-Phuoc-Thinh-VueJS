// Khởi tạo dữ liệu từ localStorage hoặc dùng dữ liệu mặc định
const defaultUsers = [
  {
    id: 1,
    name: 'thinh',
    email: 'ngothinh15111991@gmail.com',
    password: '123456'
  }
];

const defaultPosts = [
  {
    id: 1,
    title: 'ChatGPT của OpenAI đạt 100 triệu người dùng',
    content: 'Vào tháng 11/2022, OpenAI đã ra mắt ChatGPT - một chatbot AI có khả năng trò chuyện tự nhiên và trả lời câu hỏi một cách thông minh. Chỉ sau 2 tháng, vào tháng 1/2023, ChatGPT đã đạt 100 triệu người dùng hoạt động hàng tháng, trở thành ứng dụng tiêu dùng tăng trưởng nhanh nhất trong lịch sử.\n\nTrước đó, TikTok mất 9 tháng để đạt cột mốc này, còn Instagram phải mất 2.5 năm. Sự bùng nổ của ChatGPT đã khơi dậy cuộc đua AI toàn cầu, với Google, Microsoft, và nhiều công ty công nghệ lớn khác đổ xô đầu tư vào lĩnh vực trí tuệ nhân tạo.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    author: 'Admin',
    userId: 1,
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    id: 2,
    title: 'Lionel Messi giành Quả bóng vàng FIFA lần thứ 8',
    content: 'Ngày 30/10/2023, Lionel Messi đã được vinh danh với danh hiệu Quả bóng vàng FIFA lần thứ 8, củng cố vị thế huyền thoại của mình trong làng bóng đá thế giới. Đây là lần đầu tiên một cầu thủ đạt được thành tích này.\n\nMessi giành giải thưởng cao quý nhất dành cho cá nhân sau khi dẫn dắt đội tuyển Argentina vô địch World Cup 2022 tại Qatar - danh hiệu duy nhất còn thiếu trong sự nghiệp lẫy lừng của anh.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
    author: 'Admin',
    userId: 1,
    createdAt: '2026-01-20T14:30:00.000Z'
  },
  {
    id: 3,
    title: 'WHO công bố kết thúc tình trạng khẩn cấp toàn cầu về COVID-19',
    content: 'Ngày 5/5/2023, Tổ chức Y tế Thế giới (WHO) đã chính thức tuyên bố kết thúc tình trạng khẩn cấp y tế toàn cầu về đại dịch COVID-19, sau hơn 3 năm kể từ khi dịch bệnh bùng phát.\n\nTổng giám đốc WHO Tedros Adhanom Ghebreyesus cho biết quyết định được đưa ra dựa trên xu hướng giảm số ca tử vong, giảm áp lực lên hệ thống y tế, và tỷ lệ dân số có miễn dịch cao thông qua vaccine và nhiễm bệnh tự nhiên.',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800',
    author: 'Admin',
    userId: 1,
    createdAt: '2026-01-25T09:15:00.000Z'
  }
];

const defaultComments = [
  {
    id: 1,
    postId: 1,
    author: 'thinh',
    content: 'Bài viết rất hay và bổ ích!',
    createdAt: '2026-01-16T08:00:00.000Z'
  }
];

const loadData = (key, defaultData) => {
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

export const users = loadData('users', defaultUsers);
export const posts = loadData('posts', defaultPosts);
export const comments = loadData('comments', defaultComments);

export const savePosts = () => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

export const saveComments = () => {
  localStorage.setItem('comments', JSON.stringify(comments));
};

export const saveUsers = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const deletePost = (postId) => {
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
    savePosts();
    return true;
  }
  return false;
};

export const updatePost = (postId, updatedData) => {
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedData };
    savePosts();
    return true;
  }
  return false;
};