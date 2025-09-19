'ステータスバーをインポート'
import { StatusBar } from 'expo-status-bar';
'スタイルオブジェクト・レイアウトの作成'
import { StyleSheet, View } from 'react-native';
'カレンダーコンポーネントのインポート'
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';


export default function App() {
  const [checkedDates, setCheckedDates] = useState({});

  const handleDayPress = (day) => {
    '日付文字列の取得'
    const dateString = day.dateString;
    '現在のチェック状態に応じて更新'
    setCheckedDates(prev => {
      'すでにチェックされている場合は削除'
      if (prev[dateString]) {
        const updated = { ...prev };
        delete updated[dateString];
        return updated;
      'チェックされていない場合は`true`に設定'
      } else {
        return { ...prev, [dateString]: true };
      }
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        current={new Date().toISOString().split('T')[0]}
        onDayPress={handleDayPress}
        dayComponent={({ date, state }) => {
          const isChecked = checkedDates[date.dateString];
          return (
            <TouchableOpacity
              onPress={() => handleDayPress({ dateString: date.dateString })}
              activeOpacity={0.7}
              disabled={state === 'disabled'}
              style={{ alignItems: 'center' }}
            >
              <Text style={{
                color: state === 'disabled' ? '#d9e1e8' : '#222',
                fontWeight: 'bold',
                fontSize: 16
              }}>{date.day}</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#2196f3',
                  minHeight: 30,
                  textAlign: 'center',
                  lineHeight: 30,
                }}
              >
                {isChecked ? '🏋️‍♀️' : ' '}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  calendar: {
    width: 370,
    height: 420,
    borderRadius: 16,
    elevation: 4,
  },
});
