import React, { useEffect, useState } from 'react';
import './KakaoMap.css';
import Header from './layout/Header.js';

function KakaoMap() {
    const [buyerLocation, setBuyerLocation] = useState('');
    const [sellerLocation, setSellerLocation] = useState('');
    const [midpoint, setMidpoint] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [tradeLocation, setTradeLocation] = useState(null); // 거래 장소 상태 추가
    const appKey = process.env.REACT_APP_KAKAO_APP_KEY;

    useEffect(() => {
        const loadKakaoMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services`;
            script.async = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (!window.kakao || !window.kakao.maps) return;

            const mapContainer = document.getElementById('map');
            const map = new window.kakao.maps.Map(mapContainer, {
                center: new window.kakao.maps.LatLng(37.5664, 126.978),
                level: 3,
            });
            const bounds = new window.kakao.maps.LatLngBounds();

const addMarker = (lat, lng, title) => {
    const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
    });
    marker.setMap(map);
    bounds.extend(marker.getPosition());

    // 둥근 직사각형으로 디자인된 오버레이
    const content = `
        <div style="position: relative; bottom: 20px; border-radius: 12px; background-color: white; color: black; font-weight: bold; padding: 8px 12px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); border: 1px solid #ddd;">
            ${title}
        </div>
    `;

    const customOverlay = new window.kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: content,
        yAnchor: 1.5, // 마커가 가려지지 않도록 오버레이 위치 조정
    });

    customOverlay.setMap(map);
};


            const getCoordinates = (address) => new Promise((resolve, reject) => {
                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(address, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
                    } else {
                        reject("주소 검색 실패: " + address);
                    }
                });
            });

            const calculateMidpoint = (buyerCoords, sellerCoords) => {
                const midLat = (buyerCoords.lat + sellerCoords.lat) / 2;
                const midLng = (buyerCoords.lng + sellerCoords.lng) / 2;
                return { lat: midLat, lng: midLng };
            };

            const searchNearbyFacilities = (midCoords) => {
                const places = new window.kakao.maps.services.Places();
                places.categorySearch('CS2', (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        setRecommendations(data.map(place => ({
                            name: place.place_name,
                            address: place.road_address_name || place.address_name,
                            lat: place.y,
                            lng: place.x,
                        })));
                    }
                }, { location: new window.kakao.maps.LatLng(midCoords.lat, midCoords.lng), radius: 1000 });
            };

            const button = document.getElementById('calculate-button');
            button.onclick = async () => {
                if (!buyerLocation || !sellerLocation) {
                    alert("구매자와 판매자 위치를 모두 입력하세요.");
                    return;
                }

                try {
                    const buyerCoords = await getCoordinates(buyerLocation);
                    const sellerCoords = await getCoordinates(sellerLocation);

                    addMarker(buyerCoords.lat, buyerCoords.lng, "구매자 위치");
                    addMarker(sellerCoords.lat, sellerCoords.lng, "판매자 위치");

                    const midCoords = calculateMidpoint(buyerCoords, sellerCoords);
                    setMidpoint(midCoords);
                    addMarker(midCoords.lat, midCoords.lng, "중간 지점 추천!!");

                    searchNearbyFacilities(midCoords);
                    map.setBounds(bounds);
                } catch (error) {
                    alert(error);
                }
            };
        };

        loadKakaoMapScript();
    }, [buyerLocation, sellerLocation]);

    const handlePlaceSelect = (place) => {
        setSelectedPlace(place);
    };

    const setTradeLocationHandler = () => {
        if (selectedPlace) {
            setTradeLocation(selectedPlace);
            alert(`거래 장소로 설정되었습니다: ${selectedPlace.name}`);
        } else {
            alert("거래 장소를 선택하세요.");
        }
    };

    return (
        <div>
            <main>
                <div className="input-section">
                    <div className="input-container">
                        <label>구매자 위치:</label>
                        <input className="input-buyer"
                            type="text"
                            value={buyerLocation}
                            onChange={(e) => setBuyerLocation(e.target.value)}
                            placeholder="구매자 주소를 입력하세요 (ex:서울특별시 용산구 한강대로 405)"
                        />
                    </div>
                    <div className="input-container">
                        <label>판매자 위치:</label>
                        <input className="input-seller"
                            type="text"
                            value={sellerLocation}
                            onChange={(e) => setSellerLocation(e.target.value)}
                            placeholder="판매자 주소를 입력하세요 (ex:서울특별시 용산구 한강대로 405)"
                        />
                    </div>
                </div>

                <button className="midpoint-btn" id="calculate-button">중간 지점 도우미</button>

                <div className="map-container">
                    <div id="map"></div>
                </div>

                <h3>추천 편의시설</h3>
                <ul>
                    {recommendations.map((place, index) => (
                        <li
                            key={index}
                            onClick={() => handlePlaceSelect(place)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: selectedPlace === place ? '#d3f4d3' : 'white'
                            }}
                        >
                            {place.name} ({place.address})
                        </li>
                    ))}
                </ul>

                <button className="calculate-button" onClick={setTradeLocationHandler}>
                    거래 장소로 설정하기
                </button>

                {tradeLocation && (
                    <div className="trade-location">
                        <h4>거래 장소: {tradeLocation.name}</h4>
                        <p>{tradeLocation.address}</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default KakaoMap;
