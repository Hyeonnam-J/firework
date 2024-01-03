export default class Utils {
    static calculateCoordinates(startX, startY, distance, angleInDegrees) {
        // 각도를 라디안으로 변환
        // javascript에서 제공하는 Math.cos() 메서드는 인자로 라디안 값을 기대한다.
        var angleInRadians = angleInDegrees * (Math.PI / 180);
    
        // 새로운 좌표 계산
        var x = startX + distance * Math.cos(angleInRadians);
        var y = startY + distance * Math.sin(angleInRadians);
    
        // 결과 반환
        return { x: x, y: y };
    }
    
    static values = {
        originWidth: 2.5,
        originHeight: 80,
    
        fragmentsWidth: 4,
        fragmentsHeight: 20,
        fragmentsDuration: () => Math.random() * 2000 + 3000,
        fragmentsDefaultDistance: () => ( Math.random() * 100 ) + 200,
        fragmentsLongDistance: () => ( Math.random() * 200 ) + 300,
    
        fallingParticlesSize: 4,
        fallingParticlesDuration: () => Math.random() * 2000 + 1000,
    
        traceSize: 1,
        traceDuration: 2000,
    
        lightGravity: 10,
        heavyGravity: 30,
    }
    
    static colors = {
        yellow: "#f8fc03",    // 노란 계통
        lime: "#88fc03",       // 연두 계통
        green: "#03fc4e",      // 초록 계통
        red: "#fc0303",        // 빨간 계통
        pink: "#fc03db",       // 핑크 계통
        purple: "#c603fc",     // 보라 계통
        white: "#FFFFFF",      // 흰색 계통
        aqua: "#03fcb5",       // 연청 계통
        skyBlue: "#03f8fc",    // 하늘 계통
        blue: "#0390fc",       // 파랑 계통
        orange: "#fc7703"      // 주황 계통
    };
}