

#include<stdlib.h>
#include<stdio.h>
#include<string.h>
#include<math.h>
void removeAll(char * str, const char * toRemove);
int countrows=0;

#define BUFFER_SIZE 1000
 

int main()
{
  int n;
  char name[10];
  printf("Menu:\n");
  printf("Press 1 to add a device\n");
  printf("Press 0 to remove a device\n");
  printf("Press 9 to show devices\n");
  printf("Press 8 to exit\n");
  
  abc: printf("\n");  
  FILE *dc;
  dc = fopen("devices_count.dat", "a+");
  int counter;
  fscanf (dc, "%d", &counter);    
  while (!feof (dc))
  {  
    fscanf (dc, "%d", &counter);      
  }
  fclose (dc);
  printf("Enter choice\n");
  scanf("%d",&n);
 
  if(n==1)
  {
    printf("enter the name of your device\n");
    if(scanf("%s",name))
    {
      FILE *fp;
      char SensorsName[255];
      char tempName[20];
      fp= fopen("Devices.txt", "a+");
      fputs(name, fp);
      fputs("\n", fp);
      ++counter;
      char buf[5];
      snprintf(buf, 5, "%d", counter);
      FILE *q = fopen("temp1.dat", "a+");
      fputs(buf, q);
      remove("devices_count.dat");
      rename("temp1.dat", "devices_count.dat");
      fclose(q);
      fclose(fp);
    }
    goto abc;  
  }
  else if(n==0 && counter == 0)
  {
    printf("No devices there to remove\n");
    counter=0;
    char buf[5];
    snprintf(buf, 5, "%d", counter);
    FILE *q = fopen("temp1.dat", "a+");
    fputs(buf, q);
    remove("devices_count.dat");
    rename("temp1.dat", "devices_count.dat");
    fclose(q);
  
    goto abc;
  }
  else if(n==0 && counter!=0)
  {
    FILE * fptr;  
    FILE * fTemp;

    char path[100]; 
    char toRemove[100];
    char buffer[1000];

    printf("Enter device name to be removed:\n");
    scanf("%s", toRemove);

    fptr = fopen("Devices.txt","a+"); 
    fTemp = fopen("temp.txt", "a+");

    if(fptr == NULL || fTemp == NULL)
    {
      printf("\nUnable to open file\n");
      exit(EXIT_SUCCESS);
    }

    while ((fgets(buffer, BUFFER_SIZE, fptr))!=NULL)
    {
      removeAll(buffer, toRemove);
      fputs(buffer, fTemp);
    }

    fclose(fptr);
    fclose(fTemp);

    remove("Devices.txt");
    rename("temp.txt", "Devices.txt");

    --counter;
    char buf[5];
    snprintf(buf, 5, "%d", counter);
    FILE *q = fopen("temp1.dat", "a+");
    fputs(buf, q);
    remove("devices_count.dat");
    rename("temp1.dat", "devices_count.dat");
    fclose(q);
  
    goto abc;  
  }

  else if(n==9)
  {

    FILE *z;
    z = fopen("devices_count.dat", "a+");
    int counter_final;
    fscanf (z, "%d", &counter_final);    
    while (!feof (z))
    {  
      fscanf (z, "%d", &counter_final);      
    }
    fclose (z);
    printf("No. of connected devices are: %d\n", counter_final);
   
    if(counter_final!=0)
    {
     char *line_buf = NULL;
     size_t line_buf_size = 0;
     int line_count = 0;
     ssize_t line_size;
     FILE * fp = fopen("Devices.txt", "r");
     int c=getw(fp);
     line_size = getline(&line_buf, &line_buf_size, fp);

     printf("The connected devices are:\n");

     while(line_size>=0)
     {

       line_count++;
       printf("%s", line_buf);
       line_size = getline(&line_buf, &line_buf_size, fp);
     }
   }  
   goto abc;
  }
  else if(n==8)
  {
   exit(0);
  }
  else
  {
   printf("Invalid Choice! Enter choice again");
   goto abc;
  }
  return 0;
  
}


void removeAll(char *str, const char * toRemove)
{
  int i,j, stringLen, toRemoveLen;
  int found;

  stringLen = strlen(str);
  toRemoveLen = strlen(toRemove);
  for(i=0; i<=stringLen-toRemoveLen; i++)
  {
    found=1;
    for(j=0; j < toRemoveLen; j++)
    {
      if(str[i+j] != toRemove[j])
      {
        found = 0;
        break;
      }
    }
    if( found == 1)
    {
      for(j=i; j<= stringLen - toRemoveLen; j++)
      {
        str[j] = str[j + toRemoveLen]; 
      }
      i--;
    }
  } 
}

