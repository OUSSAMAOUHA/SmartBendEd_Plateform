package ensaj.planning.entities;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FilterAllDaysBetweenMonths {
    public static void main(String[] args) {
        // Define the start and end months and years
        Month startMonth = Month.SEPTEMBER;
        int startYear = 2023;
        Month endMonth = Month.JANUARY; // Last week of January
        int endYear = 2024;

        // Map to store days of the week
        Map<DayOfWeek, List<LocalDate>> daysOfWeekMap = new HashMap<>();

        // Get the first day of September
        LocalDate startDate = LocalDate.of(startYear, startMonth, 1);

        // Iterate through each day between the months
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(LocalDate.of(endYear, endMonth, 1))) {
            DayOfWeek dayOfWeek = currentDate.getDayOfWeek();
            daysOfWeekMap.computeIfAbsent(dayOfWeek, k -> new ArrayList<>()).add(currentDate);
            currentDate = currentDate.plusDays(1);
        }

        // Output the list of days for each day of the week
        for (DayOfWeek day : daysOfWeekMap.keySet()) {
            switch (day) {
                case MONDAY:
                    System.out.println("All Mondays:");
                    break;
                case TUESDAY:
                    System.out.println("All Tuesdays:");
                    break;
                case WEDNESDAY:
                    System.out.println("All Wednesdays:");
                    break;
                case THURSDAY:
                    System.out.println("All Thursdays:");
                    break;
                case FRIDAY:
                    System.out.println("All Fridays:");
                    break;
                case SATURDAY:
                    System.out.println("All Saturdays:");
                    break;
                case SUNDAY:
                    System.out.println("All Sundays:");
                    break;
            }

            for (LocalDate date : daysOfWeekMap.get(day)) {
                System.out.println(date);
            }
            System.out.println();
        }
    }
}
