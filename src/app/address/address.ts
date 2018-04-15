export class District {
    constructor(public name: string) { }
}
export class City {
    constructor(public name: string, public districts: District[]) { }
}


export const cities =
    [
        {
            name: 'Thành Phố Cần Thơ',
            districts: [
                { name: 'Huyện Cờ Đỏ' },
                { name: 'Huyện Phong Điền' },
                { name: 'Huyện Thới Lai' },
                { name: 'Huyện Vĩnh Thạnh' },
                { name: 'Quận Bình Thủy' },
                { name: 'Quận Cái Răng' },
                { name: 'Quận Ninh Kiều' },
                { name: 'Quận Ô Môn' },
                { name: 'Quận Thốt Nốt' }
            ]
        },
        {
            name: 'Thành phố Đà Nẵng',
            districts: [
                { name: 'Huyện Hòa Vang' },
                { name: 'Huyện Hoàng Sa' },
                { name: 'Quận Cẩm Lệ' },
                { name: 'Quận Hải Châu' },
                { name: 'Quận Liên Chiểu' },
                { name: 'Quận Ngũ Hành Sơn' },
                { name: 'Quận Sơn Trà' },
                { name: 'Quận Thanh Khê' }
            ]
        },
        {
            name: 'Thành phố Hà Nội',
            districts: [
                { name: 'Huyện Ba Vì' },
                { name: 'Huyện Chương Mỹ' },
                { name: 'Huyện Đan Phượng' },
                { name: 'Huyện Đông Anh' },
                { name: 'Huyện Gia Lâm' },
                { name: 'Huyện Hoài Đức' },
                { name: 'Huyện Mê Linh' },
                { name: 'Huyện Mỹ Đức' },
                { name: 'Huyện Phú Xuyên' },
                { name: 'Huyện Phúc Thọ' },
                { name: 'Huyện Quốc Oai' },
                { name: 'Huyện Sóc Sơn' },
                { name: 'Huyện Thạch Thất' },
                { name: 'Huyện Thanh Oai' },
                { name: 'Huyện Thanh Trì' },
                { name: 'Huyện Thường Tín' },
                { name: 'Huyện Từ Liêm' },
                { name: 'Huyện ứng Hòa' },
                { name: 'Quận Ba Đình' },
                { name: 'Quận Cầu Giấy' },
                { name: 'Quận Đống Đa' },
                { name: 'Quận Hà Đông' },
                { name: 'Quận Hai Bà Trưng' },
                { name: 'Quận Hoàn Kiếm' },
                { name: 'Quận Hoàng Mai' },
                { name: 'Quận Long Biên' },
                { name: 'Quận Tây Hồ' },
                { name: 'Quận Thanh Xuân' },
                { name: 'Thị xã Sơn Tây' }
            ]
        },
        {
            name: 'Thành phố Hải Phòng',
            districts: [
                { name: 'Huyện An Dương' },
                { name: 'Huyện An Lão' },
                { name: 'Huyện Bạch Long Vĩ' },
                { name: 'Huyện Cát Hải' },
                { name: 'Huyện Kiến Thụy' },
                { name: 'Huyện Thủy Nguyên' },
                { name: 'Huyện Tiên Lãng' },
                { name: 'Huyện Vĩnh Bảo' },
                { name: 'Quận Đồ Sơn' },
                { name: 'Quận Dương Kinh' },
                { name: 'Quận Hải An' },
                { name: 'Quận Hồng Bàng' },
                { name: 'Quận Kiến An' },
                { name: 'Quận Lê Chân' },
                { name: 'Quận Ngô Quyền' }
            ]
        },
        {
            name: 'Thành phố Hồ Chí Minh',
            districts: [
                { name: 'Huyện Bình Chánh' },
                { name: 'Huyện Cần Giờ' },
                { name: 'Huyện Củ Chi' },
                { name: 'Huyện Hóc Môn' },
                { name: 'Huyện Nhà Bè' },
                { name: 'Quận 1' },
                { name: 'Quận 10' },
                { name: 'Quận 11' },
                { name: 'Quận 12' },
                { name: 'Quận 2' },
                { name: 'Quận 3' },
                { name: 'Quận 4' },
                { name: 'Quận 5' },
                { name: 'Quận 6' },
                { name: 'Quận 7' },
                { name: 'Quận 8' },
                { name: 'Quận 9' },
                { name: 'Quận Bình Tân' },
                { name: 'Quận Bình Thạnh' },
                { name: 'Quận Gò Vấp' },
                { name: 'Quận Phú Nhuận' },
                { name: 'Quận Tân Bình' },
                { name: 'Quận Tân Phú' },
                { name: 'Quận Thủ Đức' }
            ]
        },
        {
            name: 'Tỉnh An Giang',
            districts: [
                { name: 'Huyện An Phú' },
                { name: 'Huyện Châu Phú' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Chợ Mới' },
                { name: 'Huyện Phú Tân' },
                { name: 'Huyện Thoại Sơn' },
                { name: 'Huyện Tịnh Biên' },
                { name: 'Huyện Tri Tôn' },
                { name: 'Thành phố Long Xuyên' },
                { name: 'Thị xã Châu Đốc' },
                { name: 'Thị xã Tân Châu' }
            ]
        },
        {
            name: 'Tỉnh Bà Rịa-Vũng Tàu',
            districts: [
                { name: 'Huyện Châu Đức' },
                { name: 'Huyện Côn Đảo' },
                { name: 'Huyện Đất Đỏ' },
                { name: 'Huyện Long Điền' },
                { name: 'Huyện Tân Thành' },
                { name: 'Huyện Xuyên Mộc' },
                { name: 'Thành phố Vũng Tàu' },
                { name: 'Thị xã Bà Rịa' }
            ]
        },
        {
            name: 'Tỉnh Bắc Giang',
            districts: [
                { name: 'Huyện Hiệp Hòa' },
                { name: 'Huyện Lạng Giang' },
                { name: 'Huyện Lục Nam' },
                { name: 'Huyện Lục Ngạn' },
                { name: 'Huyện Sơn Động' },
                { name: 'Huyện Tân Yên' },
                { name: 'Huyện Việt Yên' },
                { name: 'Huyện Yên Dũng' },
                { name: 'Huyện Yên Thế' },
                { name: 'Thành phố Bắc Giang' }
            ]
        },
        {
            name: 'Tỉnh Bắc Kạn',
            districts: [
                { name: 'Huyện Ba Bể' },
                { name: 'Huyện Bạch Thông' },
                { name: 'Huyện Chợ Đồn' },
                { name: 'Huyện Chợ Mới' },
                { name: 'Huyện Na Rì' },
                { name: 'Huyện Ngân Sơn' },
                { name: 'Huyện Pác Nặm' },
                { name: 'Thị xã Bắc Kạn' }
            ]
        },
        {
            name: 'Tỉnh Bạc Liêu',
            districts: [
                { name: 'Huyện Đông Hải' },
                { name: 'Huyện Giá Rai' },
                { name: 'Huyện Hòa Bình' },
                { name: 'Huyện Hồng Dân' },
                { name: 'Huyện Phước Long' },
                { name: 'Huyện Vĩnh Lợi' },
                { name: 'Thành Phố Bạc Liêu' }
            ]
        },
        {
            name: 'Tỉnh Bắc Ninh',
            districts: [
                { name: 'Huyện Gia Bình' },
                { name: 'Huyện Lương Tài' },
                { name: 'Huyện Quế Võ' },
                { name: 'Huyện Thuận Thành' },
                { name: 'Huyện Tiên Du' },
                { name: 'Huyện Yên Phong' },
                { name: 'Thành phố Bắc Ninh' },
                { name: 'Thị xã Từ Sơn' }
            ]
        },
        {
            name: 'Tỉnh Bến Tre',
            districts: [
                { name: 'Huyện Ba Tri' },
                { name: 'Huyện Bình Đại' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Chợ Lách' },
                { name: 'Huyện Giồng Trôm' },
                { name: 'Huyện Mỏ Cày Bắc' },
                { name: 'Huyện Mỏ Cày Nam' },
                { name: 'Huyện Thạnh Phú' },
                { name: 'Thành phố Bến Tre' }
            ]
        },
        {
            name: 'Tỉnh Bình Định',
            districts: [
                { name: 'Huyện An Lão' },
                { name: 'Huyện An Nhơn' },
                { name: 'Huyện Hoài  Ân' },
                { name: 'Huyện Hoài Nhơn' },
                { name: 'Huyện Phù Mỹ' },
                { name: 'Huyện Phù cát' },
                { name: 'Huyện Tây Sơn' },
                { name: 'Huyện Tuy Phước' },
                { name: 'Huyện Vân Canh' },
                { name: 'Huyện Vĩnh Thạnh' },
                { name: 'Thành phố Quy Nhơn' }
            ]
        },
        {
            name: 'Tỉnh Bình Dương',
            districts: [
                { name: 'Huyện Bến Cát' },
                { name: 'Huyện Dầu Tiếng' },
                { name: 'Huyện Dĩ An' },
                { name: 'Huyện Phú Giáo' },
                { name: 'Huyện Tân Uyên' },
                { name: 'Huyện Thuận An' },
                { name: 'Thị xã Thủ Dầu Một' }
            ]
        },
        {
            name: 'Tỉnh Bình Phước',
            districts: [
                { name: 'Huyện Bù Đăng' },
                { name: 'Huyện Bù Đốp' },
                { name: 'Huyện Bù Gia Mập' },
                { name: 'Huyện Chơn Thành' },
                { name: 'Huyện Đồng Phú' },
                { name: 'Huyện Hớn Quản' },
                { name: 'Huyện Lộc Ninh' },
                { name: 'Thị xã Bình Long' },
                { name: 'Thị xã Đồng Xoài' },
                { name: 'Thị xã Phước Long' }
            ]
        },
        {
            name: 'Tỉnh Bình Thuận',
            districts: [
                { name: 'Huyện  Đức Linh' },
                { name: 'Huyện Bắc Bình' },
                { name: 'Huyện Hàm Tân' },
                { name: 'Huyện Hàm Thuận Bắc' },
                { name: 'Huyện Hàm Thuận Nam' },
                { name: 'Huyện Phú Qúi' },
                { name: 'Huyện Tánh Linh' },
                { name: 'Huyện Tuy Phong' },
                { name: 'Thành phố Phan Thiết' },
                { name: 'Thị xã La Gi' }
            ]
        },
        {
            name: 'Tỉnh Cà Mau',
            districts: [
                { name: 'Huyện Cái Nước' },
                { name: 'Huyện Đầm Dơi' },
                { name: 'Huyện Năm Căn' },
                { name: 'Huyện Ngọc Hiển' },
                { name: 'Huyện Phú Tân' },
                { name: 'Huyện Thới Bình' },
                { name: 'Huyện Trần Văn Thời' },
                { name: 'Huyện U Minh' },
                { name: 'Thành phố Cà Mau' }
            ]
        },
        {
            name: 'Tỉnh Cao Bằng',
            districts: [
                { name: 'Huyện Bảo Lạc' },
                { name: 'Huyện Bảo Lâm' },
                { name: 'Huyện Hạ Lang' },
                { name: 'Huyện Hà Quảng' },
                { name: 'Huyện Hòa An' },
                { name: 'Huyện Nguyên Bình' },
                { name: 'Huyện Phục Hòa' },
                { name: 'Huyện Quảng Uyên' },
                { name: 'Huyện Thạch An' },
                { name: 'Huyện Thông Nông' },
                { name: 'Huyện Trà Lĩnh' },
                { name: 'Huyện Trùng Khánh' },
                { name: 'Thị xã Cao Bằng' }
            ]
        },
        {
            name: 'Tỉnh Đắk Lắk',
            districts: [
                { name: 'Huyện Buôn Đôn' },
                { name: 'Huyện Cư Kuin' },
                { name: 'Huyện Cư MGar' },
                { name: 'Huyện Ea Kar' },
                { name: 'Huyện Ea Súp' },
                { name: 'Huyện EaHLeo' },
                { name: 'Huyện Krông Ana' },
                { name: 'Huyện Krông Bông' },
                { name: 'Huyện Krông Búk' },
                { name: 'Huyện Krông Năng' },
                { name: 'Huyện Krông Pắc' },
                { name: 'Huyện Lắk' },
                { name: 'Huyện MDrắk' },
                { name: 'Thành phố Buôn Ma Thuột' },
                { name: 'Thị xã Buôn Hồ' }
            ]
        },
        {
            name: 'Tỉnh Đắk Nông',
            districts: [
                { name: 'Huyện Cư Jút' },
                { name: 'Huyện Đắk GLong' },
                { name: 'Huyện Đắk Mil' },
                { name: 'Huyện Đắk RLấp' },
                { name: 'Huyện Đắk Song' },
                { name: 'Huyện KRông Nô' },
                { name: 'Huyện Tuy Đức' },
                { name: 'Thị xã Gia Nghĩa' }
            ]
        },
        {
            name: 'Tỉnh Điện Biên',
            districts: [
                { name: 'Huyện Điện Biên' },
                { name: 'Huyện Điện Biên Đông' },
                { name: 'Huyện Mường Chà' },
                { name: 'Huyện Mương Nhé' },
                { name: 'Huyện Mường ảng' },
                { name: 'Huyện Tủa Chùa' },
                { name: 'Huyện Tuần Giáo' },
                { name: 'Thành phố Điện Biên phủ' },
                { name: 'Thị xã Mường Lay' }
            ]
        },
        {
            name: 'Tỉnh Đồng Nai',
            districts: [
                { name: 'Huyện Cẩm Mỹ' },
                { name: 'Huyện Định Quán' },
                { name: 'Huyện Long Thành' },
                { name: 'Huyện Nhơn Trạch' },
                { name: 'Huyện Tân Phú' },
                { name: 'Huyện Thống Nhất' },
                { name: 'Huyện Trảng Bom' },
                { name: 'Huyện Vĩnh Cửu' },
                { name: 'Huyện Xuân Lộc' },
                { name: 'Thành phố Biên Hòa' },
                { name: 'Thị xã Long Khánh' }
            ]
        },
        {
            name: 'Tỉnh Đồng Tháp',
            districts: [
                { name: 'Huyện Cao Lãnh' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Hồng Ngự' },
                { name: 'Huyện Lai Vung' },
                { name: 'Huyện Lấp Vò' },
                { name: 'Huyện Tam Nông' },
                { name: 'Huyện Tân Hồng' },
                { name: 'Huyện Thanh Bình' },
                { name: 'Huyện Tháp Mười' },
                { name: 'Thành phố Cao Lãnh' },
                { name: 'Thị xã Hồng Ngự' },
                { name: 'Thị xã Sa Đéc' }
            ]
        },
        {
            name: 'Tỉnh Gia Lai',
            districts: [
                { name: 'Huyện Chư Păh' },
                { name: 'Huyện Chư Pưh' },
                { name: 'Huyện Chư Sê' },
                { name: 'Huyện ChưPRông' },
                { name: 'Huyện Đăk Đoa' },
                { name: 'Huyện Đăk Pơ' },
                { name: 'Huyện Đức Cơ' },
                { name: 'Huyện Ia Grai' },
                { name: 'Huyện Ia Pa' },
                { name: 'Huyện KBang' },
                { name: 'Huyện KBang' },
                { name: 'Huyện Kông Chro' },
                { name: 'Huyện Krông Pa' },
                { name: 'Huyện Mang Yang' },
                { name: 'Huyện Phú Thiện' },
                { name: 'Thành phố Plei Ku' },
                { name: 'Thị xã AYun Pa' },
                { name: 'Thị xã An Khê' }
            ]
        },
        {
            name: 'Tỉnh Hà Giang',
            districts: [
                { name: 'Huyện Bắc Mê' },
                { name: 'Huyện Bắc Quang' },
                { name: 'Huyện Đồng Văn' },
                { name: 'Huyện Hoàng Su Phì' },
                { name: 'Huyện Mèo Vạc' },
                { name: 'Huyện Quản Bạ' },
                { name: 'Huyện Quang Bình' },
                { name: 'Huyện Vị Xuyên' },
                { name: 'Huyện Xín Mần' },
                { name: 'Huyện Yên Minh' },
                { name: 'Thành Phố Hà Giang' }
            ]
        },
        {
            name: 'Tỉnh Hà Nam',
            districts: [
                { name: 'Huyện Bình Lục' },
                { name: 'Huyện Duy Tiên' },
                { name: 'Huyện Kim Bảng' },
                { name: 'Huyện Lý Nhân' },
                { name: 'Huyện Thanh Liêm' },
                { name: 'Thành phố Phủ Lý' }
            ]
        },
        {
            name: 'Tỉnh Hà Tĩnh',
            districts: [
                { name: 'Huyện Cẩm Xuyên' },
                { name: 'Huyện Can Lộc' },
                { name: 'Huyện Đức Thọ' },
                { name: 'Huyện Hương Khê' },
                { name: 'Huyện Hương Sơn' },
                { name: 'Huyện Kỳ Anh' },
                { name: 'Huyện Lộc Hà' },
                { name: 'Huyện Nghi Xuân' },
                { name: 'Huyện Thạch Hà' },
                { name: 'Huyện Vũ Quang' },
                { name: 'Thành phố Hà Tĩnh' },
                { name: 'Thị xã Hồng Lĩnh' }
            ]
        },
        {
            name: 'Tỉnh Hải Dương',
            districts: [
                { name: 'Huyện Bình Giang' },
                { name: 'Huyện Cẩm Giàng' },
                { name: 'Huyện Gia Lộc' },
                { name: 'Huyện Kim Thành' },
                { name: 'Huyện Kinh Môn' },
                { name: 'Huyện Nam Sách' },
                { name: 'Huyện Ninh Giang' },
                { name: 'Huyện Thanh Hà' },
                { name: 'Huyện Thanh Miện' },
                { name: 'Huyện Tứ Kỳ' },
                { name: 'Thành phố Hải Dương' },
                { name: 'Thị xã Chí Linh' }
            ]
        },
        {
            name: 'Tỉnh Hậu Giang',
            districts: [
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Châu Thành A' },
                { name: 'Huyện Long Mỹ' },
                { name: 'Huyện Phụng Hiệp' },
                { name: 'Huyện Vị Thủy' },
                { name: 'Thành Phố Vị Thanh' },
                { name: 'Thị xã Ngã Bảy' }
            ]
        },
        {
            name: 'Tỉnh Hòa Bình',
            districts: [
                { name: 'Huyện Cao Phong' },
                { name: 'Huyện Đà Bắc' },
                { name: 'Huyện Kim Bôi' },
                { name: 'Huyện Kỳ Sơn' },
                { name: 'Huyện Lạc Sơn' },
                { name: 'Huyện Lạc Thủy' },
                { name: 'Huyện Lương Sơn' },
                { name: 'Huyện Mai Châu' },
                { name: 'Huyện Tân Lạc' },
                { name: 'Huyện Yên Thủy' },
                { name: 'Thành phố Hòa Bình' }
            ]
        },
        {
            name: 'Tỉnh Hưng Yên',
            districts: [
                { name: 'Huyện Ân Thi' },
                { name: 'Huyện Khoái Châu' },
                { name: 'Huyện Kim Động' },
                { name: 'Huyện Mỹ Hào' },
                { name: 'Huyện Phù Cừ' },
                { name: 'Huyện Tiên Lữ' },
                { name: 'Huyện Văn Giang' },
                { name: 'Huyện Văn Lâm' },
                { name: 'Huyện Yên Mỹ' },
                { name: 'Thành phố Hưng Yên' }
            ]
        },
        {
            name: 'Tỉnh Khánh Hòa',
            districts: [
                { name: 'Huyện Cam Lâm' },
                { name: 'Huyện Diên Khánh' },
                { name: 'Huyện Khánh Sơn' },
                { name: 'Huyện Khánh Vĩnh' },
                { name: 'Huyện Ninh Hòa' },
                { name: 'Huyện Trường Sa' },
                { name: 'Huyện Vạn Ninh' },
                { name: 'Thành phố Nha Trang' },
                { name: 'Thị xã Cam Ranh' }
            ]
        },
        {
            name: 'Tỉnh Kiên Giang',
            districts: [
                { name: 'Huyện An Biên' },
                { name: 'Huyện An Minh' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Giang Thành' },
                { name: 'Huyện Giồng Riềng' },
                { name: 'Huyện Gò Quao' },
                { name: 'Huyện Hòn Đất' },
                { name: 'Huyện Kiên Hải' },
                { name: 'Huyện Kiên Lương' },
                { name: 'Huyện Phú Quốc' },
                { name: 'Huyện Tân Hiệp' },
                { name: 'Huyện U Minh Thượng' },
                { name: 'Huyện Vĩnh Thuận' },
                { name: 'Thành phố Rạch Giá' },
                { name: 'Thị xã Hà Tiên' }
            ]
        },
        {
            name: 'Tỉnh Kon Tum',
            districts: [
                { name: 'Huyện Đắk Glei' },
                { name: 'Huyện Đắk Hà' },
                { name: 'Huyện Đắk Tô' },
                { name: 'Huyện Kon Plông' },
                { name: 'Huyện Kon Rẫy' },
                { name: 'Huyện Ngọc Hồi' },
                { name: 'Huyện Sa Thầy' },
                { name: 'Huyện Tu Mơ Rông' },
                { name: 'Thành phố Kon Tum' }
            ]
        },
        {
            name: 'Tỉnh Lai Châu',
            districts: [
                { name: 'Huyện Mường Tè' },
                { name: 'Huyện Phong Thổ' },
                { name: 'Huyện Sìn Hồ' },
                { name: 'Huyện Tam Đường' },
                { name: 'Huyện Tân Uyên' },
                { name: 'Huyện Than Uyên' },
                { name: 'Thị xã Lai Châu' }
            ]
        },
        {
            name: 'Tỉnh Lâm Đồng',
            districts: [
                { name: 'Huyện Bảo Lâm' },
                { name: 'Huyện Cát Tiên' },
                { name: 'Huyện Đạ Huoai' },
                { name: 'Huyện Đạ Tẻh' },
                { name: 'Huyện Đam Rông' },
                { name: 'Huyện Di Linh' },
                { name: 'Huyện Đơn Dương' },
                { name: 'Huyện Đức Trọng' },
                { name: 'Huyện Lạc Dương' },
                { name: 'Huyện Lâm Hà' },
                { name: 'Thành phố Bảo Lộc' },
                { name: 'Thành phố Đà Lạt' }
            ]
        },
        {
            name: 'Tỉnh Lạng Sơn',
            districts: [
                { name: 'Huyện Bắc Sơn' },
                { name: 'Huyện Bình Gia' },
                { name: 'Huyện Cao Lộc' },
                { name: 'Huyện Chi Lăng' },
                { name: 'Huyện Đình Lập' },
                { name: 'Huyện Hữu Lũng' },
                { name: 'Huyện Lộc Bình' },
                { name: 'Huyện Tràng Định' },
                { name: 'Huyện Văn Lãng' },
                { name: 'Huyện Văn Quan' },
                { name: 'Thành phố Lạng Sơn' }
            ]
        },
        {
            name: 'Tỉnh Lào Cai',
            districts: [
                { name: 'Huyện Bắc Hà' },
                { name: 'Huyện Bảo Thắng' },
                { name: 'Huyện Bảo Yên' },
                { name: 'Huyện Bát Xát' },
                { name: 'Huyện Mường Khương' },
                { name: 'Huyện Sa Pa' },
                { name: 'Huyện Si Ma Cai' },
                { name: 'Huyện Văn Bàn' },
                { name: 'Thành phố Lào Cai' }
            ]
        },
        {
            name: 'Tỉnh Long An',
            districts: [
                { name: 'Huyện Bến Lức' },
                { name: 'Huyện Cần Đước' },
                { name: 'Huyện Cần Giuộc' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Đức Hòa' },
                { name: 'Huyện Đức Huệ' },
                { name: 'Huyện Mộc Hóa' },
                { name: 'Huyện Tân Hưng' },
                { name: 'Huyện Tân Thạnh' },
                { name: 'Huyện Tân Trụ' },
                { name: 'Huyện Thạnh Hóa' },
                { name: 'Huyện Thủ Thừa' },
                { name: 'Huyện Vĩnh Hưng' },
                { name: 'Thành phố Tân An' }
            ]
        },
        {
            name: 'Tỉnh Nam Định',
            districts: [
                { name: 'Huyện Giao Thủy' },
                { name: 'Huyện Hải Hậu' },
                { name: 'Huyện Mỹ Lộc' },
                { name: 'Huyện Nam Trực' },
                { name: 'Huyện Nghĩa Hưng' },
                { name: 'Huyện Trực Ninh' },
                { name: 'Huyện Vụ Bản' },
                { name: 'Huyện Xuân Trường' },
                { name: 'Huyện ý Yên' },
                { name: 'Thành phố Nam Định' }
            ]
        },
        {
            name: 'Tỉnh Nghệ An',
            districts: [
                { name: 'Huyện Anh Sơn' },
                { name: 'Huyện Con Cuông' },
                { name: 'Huyện Diễn Châu' },
                { name: 'Huyện Đô Lương' },
                { name: 'Huyện Hưng Nguyên' },
                { name: 'Huyện Kỳ Sơn' },
                { name: 'Huyện Nam Đàn' },
                { name: 'Huyện Nghi Lộc' },
                { name: 'Huyện Nghĩa Đàn' },
                { name: 'Huyện Quế Phong' },
                { name: 'Huyện Quỳ Châu' },
                { name: 'Huyện Quỳ Hợp' },
                { name: 'Huyện Quỳnh Lưu' },
                { name: 'Huyện Tân Kỳ' },
                { name: 'Huyện Thanh Chương' },
                { name: 'Huyện Tương Dương' },
                { name: 'Huyện Yên Thành' },
                { name: 'Thành phố Vinh' },
                { name: 'Thị xã Cửa Lò' },
                { name: 'Thị xã Thái Hòa' }
            ]
        },
        {
            name: 'Tỉnh Ninh Bình',
            districts: [
                { name: 'Huyện Gia Viễn' },
                { name: 'Huyện Hoa Lư' },
                { name: 'Huyện Kim Sơn' },
                { name: 'Huyện Nho Quan' },
                { name: 'Huyện Yên Khánh' },
                { name: 'Huyện Yên Mô' },
                { name: 'Thành phố Ninh Bình' },
                { name: 'Thị xã Tam Điệp' }
            ]
        },
        {
            name: 'Tỉnh Ninh Thuận',
            districts: [
                { name: 'Huyên Bác ái' },
                { name: 'Huyện Ninh Hải' },
                { name: 'Huyện Ninh Phước' },
                { name: 'Huyện Ninh Sơn' },
                { name: 'Huyện Thuận Bắc' },
                { name: 'Huyện Thuận Nam' },
                { name: 'Thành phố Phan Rang-Tháp Chàm' }
            ]
        },
        {
            name: 'Tỉnh Phú Thọ',
            districts: [
                { name: 'Huyện Cẩm Khê' },
                { name: 'Huyện Đoan Hùng' },
                { name: 'Huyện Hạ Hòa' },
                { name: 'Huyện Lâm Thao' },
                { name: 'Huyện Phù Ninh' },
                { name: 'Huyện Tam Nông' },
                { name: 'Huyện Tân Sơn' },
                { name: 'Huyện Thanh Ba' },
                { name: 'Huyện Thanh Sơn' },
                { name: 'Huyện Thanh Thủy' },
                { name: 'Huyện Yên Lập' },
                { name: 'Thành phố Việt Trì' },
                { name: 'Thị xã Phú Thọ' }
            ]
        },
        {
            name: 'Tỉnh Phú Yên',
            districts: [
                { name: 'Huyện Đông Hòa' },
                { name: 'Huyện Đồng Xuân' },
                { name: 'Huyện Phú Hòa' },
                { name: 'Huyện Sơn Hòa' },
                { name: 'Huyện Sông Hinh' },
                { name: 'Huyện Tây Hòa' },
                { name: 'Huyện Tuy An' },
                { name: 'Thành phố Tuy Hòa' },
                { name: 'Thị xã Sông Cầu' }
            ]
        },
        {
            name: 'Tỉnh Quảng Bình',
            districts: [
                { name: 'Huyện Bố Trạch' },
                { name: 'Huyện Lệ Thủy' },
                { name: 'Huyện MinhHoá' },
                { name: 'Huyện Quảng Ninh' },
                { name: 'Huyện Quảng Trạch' },
                { name: 'Huyện Tuyên Hoá' },
                { name: 'Thành phố Đồng Hới' }
            ]
        },
        {
            name: 'Tỉnh Quảng Nam',
            districts: [
                { name: 'Huyện Bắc Trà My' },
                { name: 'Huyện Đại Lộc' },
                { name: 'Huyện Điện Bàn' },
                { name: 'Huyện Đông Giang' },
                { name: 'Huyện Duy Xuyên' },
                { name: 'Huyện Hiệp Đức' },
                { name: 'Huyện Nam Giang' },
                { name: 'Huyện Nam Trà My' },
                { name: 'Huyện Nông Sơn' },
                { name: 'Huyện Núi Thành' },
                { name: 'Huyện Phú Ninh' },
                { name: 'Huyện Phước Sơn' },
                { name: 'Huyện Quế Sơn' },
                { name: 'Huyện Tây Giang' },
                { name: 'Huyện Thăng Bình' },
                { name: 'Huyện Tiên Phước' },
                { name: 'Thành phố Hội An' },
                { name: 'Thành phố Tam Kỳ' }
            ]
        },
        {
            name: 'Tỉnh Quảng Ngãi',
            districts: [
                { name: 'Huyện Ba Tơ' },
                { name: 'Huyện Bình Sơn' },
                { name: 'Huyện Đức Phổ' },
                { name: 'Huyện Lý sơn' },
                { name: 'Huyện Minh Long' },
                { name: 'Huyện Mộ Đức' },
                { name: 'Huyện Nghĩa Hành' },
                { name: 'Huyện Sơn Hà' },
                { name: 'Huyện Sơn Tây' },
                { name: 'Huyện Sơn Tịnh' },
                { name: 'Huyện Tây Trà' },
                { name: 'Huyện Trà Bồng' },
                { name: 'Huyện Tư Nghĩa' },
                { name: 'Thành phố Quảng Ngãi' }
            ]
        },
        {
            name: 'Tỉnh Quảng Ninh',
            districts: [
                { name: 'Huyện Ba Chẽ' },
                { name: 'Huyện Bình Liêu' },
                { name: 'Huyện Cô Tô' },
                { name: 'Huyện Đầm Hà' },
                { name: 'Huyện Đông Triều' },
                { name: 'Huyện Hải Hà' },
                { name: 'Huyện Hoành Bồ' },
                { name: 'Huyện Tiên Yên' },
                { name: 'Huyện Vân Đồn' },
                { name: 'Huyện Yên Hưng' },
                { name: 'Thành phố Hạ Long' },
                { name: 'Thành phố Móng Cái' },
                { name: 'Thị xã Cẩm Phả' },
                { name: 'Thị xã Uông Bí' }
            ]
        },
        {
            name: 'Tỉnh Quảng Trị',
            districts: [
                { name: 'Huyện Cam Lộ' },
                { name: 'Huyện Cồn Cỏ' },
                { name: 'Huyện Đa Krông' },
                { name: 'Huyện Gio Linh' },
                { name: 'Huyện Hải Lăng' },
                { name: 'Huyện Hướng Hóa' },
                { name: 'Huyện Triệu Phong' },
                { name: 'Huyện Vính Linh' },
                { name: 'Thành phố Đông Hà' },
                { name: 'Thị xã Quảng Trị' }
            ]
        },
        {
            name: 'Tỉnh Sóc Trăng',
            districts: [
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Cù Lao Dung' },
                { name: 'Huyện Kế Sách' },
                { name: 'Huyện Long Phú' },
                { name: 'Huyện Mỹ Tú' },
                { name: 'Huyện Mỹ Xuyên' },
                { name: 'Huyện Ngã Năm' },
                { name: 'Huyện Thạnh Trị' },
                { name: 'Huyện Trần Đề' },
                { name: 'Huyện Vĩnh Châu' },
                { name: 'Thành phố Sóc Trăng' }
            ]
        },
        {
            name: 'Tỉnh Sơn La',
            districts: [
                { name: 'Huyện Bắc Yên' },
                { name: 'Huyện Mai Sơn' },
                { name: 'Huyện Mộc Châu' },
                { name: 'Huyện Mường La' },
                { name: 'Huyện Phù Yên' },
                { name: 'Huyện Quỳnh Nhai' },
                { name: 'Huyện Sông Mã' },
                { name: 'Huyện Sốp Cộp' },
                { name: 'Huyện Thuận Châu' },
                { name: 'Huyện Yên Châu' },
                { name: 'Thành phố Sơn La' }
            ]
        },
        {
            name: 'Tỉnh Tây Ninh',
            districts: [
                { name: 'Huyện Bến Cầu' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Dương Minh Châu' },
                { name: 'Huyện Gò Dầu' },
                { name: 'Huyện Hòa Thành' },
                { name: 'Huyện Tân Biên' },
                { name: 'Huyện Tân Châu' },
                { name: 'Huyện Trảng Bàng' },
                { name: 'Thị xã Tây Ninh' }
            ]
        },
        {
            name: 'Tỉnh Thái Bình',
            districts: [
                { name: 'Huyện Đông Hưng' },
                { name: 'Huyện Hưng Hà' },
                { name: 'Huyện Kiến Xương' },
                { name: 'Huyện Quỳnh Phụ' },
                { name: 'Huyện Thái Thụy' },
                { name: 'Huyện Tiền Hải' },
                { name: 'Huyện Vũ Thư' },
                { name: 'Thành phố Thái Bình' }
            ]
        },
        {
            name: 'Tỉnh Thái Nguyên',
            districts: [
                { name: 'Huyện Đại Từ' },
                { name: 'Huyện Định Hóa' },
                { name: 'Huyện Đồng Hỷ' },
                { name: 'Huyện Phổ Yên' },
                { name: 'Huyện Phú Bình' },
                { name: 'Huyện Phú Lương' },
                { name: 'Huyện Võ Nhai' },
                { name: 'Thành phố Thái Nguyên' },
                { name: 'Thị xã Sông Công' }
            ]
        },
        {
            name: 'Tỉnh Thanh Hóa',
            districts: [
                { name: 'Huyện Bá Thước' },
                { name: 'Huyện Cẩm Thủy' },
                { name: 'Huyện Đông Sơn' },
                { name: 'Huyện Hà Trung' },
                { name: 'Huyện Hậu Lộc' },
                { name: 'Huyện Hoằng Hóa' },
                { name: 'Huyện Lang Chánh' },
                { name: 'Huyện Mường Lát' },
                { name: 'Huyện Nga Sơn' },
                { name: 'Huyện Ngọc Lặc' },
                { name: 'Huyện Như Thanh' },
                { name: 'Huyện Như Xuân' },
                { name: 'Huyện Nông Cống' },
                { name: 'Huyện Quan Hóa' },
                { name: 'Huyện Quan Sơn' },
                { name: 'Huyện Quảng Xương' },
                { name: 'Huyện Thạch Thành' },
                { name: 'Huyện Thiệu Hóa' },
                { name: 'Huyện Thọ Xuân' },
                { name: 'Huyện Thường Xuân' },
                { name: 'Huyện Tĩnh Gia' },
                { name: 'Huyện Triệu Sơn' },
                { name: 'Huyện Vĩnh Lộc' },
                { name: 'Huyện Yên Định' },
                { name: 'Thành phố Thanh Hóa' },
                { name: 'Thị xã Bỉm Sơn' },
                { name: 'Thị xã Sầm Sơn' }
            ]
        },
        {
            name: 'Tỉnh Thừa Thiên Huế',
            districts: [
                { name: 'Huyện A Lưới' },
                { name: 'Huyện Hương Trà' },
                { name: 'Huyện Nam Dông' },
                { name: 'Huyện Phong Điền' },
                { name: 'Huyện Phú Lộc' },
                { name: 'Huyện Phú Vang' },
                { name: 'Huyện Quảng Điền' },
                { name: 'Thành phố Huế' },
                { name: 'thị xã Hương Thủy' }
            ]
        },
        {
            name: 'Tỉnh Tiền Giang',
            districts: [
                { name: 'Huyện Cái Bè' },
                { name: 'Huyện Cai Lậy' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Chợ Gạo' },
                { name: 'Huyện Gò Công Đông' },
                { name: 'Huyện Gò Công Tây' },
                { name: 'Huyện Tân Phú Đông' },
                { name: 'Huyện Tân Phước' },
                { name: 'Thành phố Mỹ Tho' },
                { name: 'Thị xã Gò Công' }
            ]
        },
        {
            name: 'Tỉnh Trà Vinh',
            districts: [
                { name: 'Huyện Càng Long' },
                { name: 'Huyện Cầu Kè' },
                { name: 'Huyện Cầu Ngang' },
                { name: 'Huyện Châu Thành' },
                { name: 'Huyện Duyên Hải' },
                { name: 'Huyện Tiểu Cần' },
                { name: 'Huyện Trà Cú' },
                { name: 'Thành phố Trà Vinh' }
            ]
        },
        {
            name: 'Tỉnh Tuyên Quang',
            districts: [
                { name: 'Huyện Chiêm Hóa' },
                { name: 'Huyện Hàm Yên' },
                { name: 'Huyện Na hang' },
                { name: 'Huyện Sơn Dương' },
                { name: 'Huyện Yên Sơn' },
                { name: 'Thành phố Tuyên Quang' }
            ]
        },
        {
            name: 'Tỉnh Vĩnh Long',
            districts: [
                { name: 'Huyện Bình Minh' },
                { name: 'Huyện Bình Tân' },
                { name: 'Huyện Long Hồ' },
                { name: 'Huyện Mang Thít' },
                { name: 'Huyện Tam Bình' },
                { name: 'Huyện Trà Ôn' },
                { name: 'Huyện Vũng Liêm' },
                { name: 'Thành phố Vĩnh Long' }
            ]
        },
        {
            name: 'Tỉnh Vĩnh Phúc',
            districts: [
                { name: 'Huyện Bình Xuyên' },
                { name: 'Huyện Lập Thạch' },
                { name: 'Huyện Sông Lô' },
                { name: 'Huyện Tam Đảo' },
                { name: 'Huyện Tam Dương' },
                { name: 'Huyện Vĩnh Tường' },
                { name: 'Huyện Yên Lạc' },
                { name: 'Thành phố Vĩnh Yên' },
                { name: 'Thị xã Phúc Yên' }
            ]
        },
        {
            name: 'Tỉnh Yên Bái',
            districts: [
                { name: 'Huyện Lục Yên' },
                { name: 'Huyện Mù Cang Chải' },
                { name: 'Huyện Trạm Tấu' },
                { name: 'Huyện Trấn Yên' },
                { name: 'Huyện Văn Chấn' },
                { name: 'Huyện Văn Yên' },
                { name: 'Huyện Yên Bình' },
                { name: 'Thành phố Yên Bái' },
                { name: 'Thị xã Nghĩa Lộ' }
            ]
        }
    ];
